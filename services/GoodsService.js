/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-28 14:52:44
 * @FilePath: \koa2-generator\services\GoodsService.js
 * @LastEditTime: 2022-04-10 21:32:14
 * @LastEditors: RayseaLee
 */
const Goods = require('../models').Goods
const GoodsPic = require('../models').GoodsPic
const Category = require('../models').Category
const GoodsParameter = require('../models').GoodsParameter
const Parameter = require('../models').Parameter
const config = require('../config/config.default').upload_config
const path = require('path')
const fs = require('fs')
const _sequelize = require('../models').sequelize
const sequelize = require('sequelize')
const { Op } = require("sequelize");

// 获取所有的商品信息
module.exports.getAllGoods = async (params, callback) => {
  const {pageNum, pageSize, query = ''} = params
  // 小程序获取所有的商品信息
  if(!pageNum && !pageSize) {
    const conditions = {
      include: [
        {
          model: Parameter,
          through: {
            attributes: []
          }
        },
        {
          model: GoodsPic,
          as: 'goodsPics',
          attributes: ['pic_url', ['id', 'pic_id']]
        }
      ],
    }
    const goods = await Goods.findAll(conditions)
    const data = goods.map(item => {
      return item.get({plain: true})
    })
    data.forEach(item => {
      item.goodsPics.forEach(obj => {
        obj.pic_url = config.baseURL + obj.pic_url
      })
    })
    callback(null, data)
  }
  // 分页查询
  else {
    const conditions1 = {
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id',['name', 'category_name']],
          required: true
        },
        {
          model: GoodsPic,
          as: 'goodsPics',
          attributes: ['pic_url', ['id', 'pic_id']]
        },
        {
          model: Parameter,
          through: {
            attributes: []
          }
        },
      ],
      where: {
        [Op.or]: [
          {
            name: {
              [Op.substring]: query
            }
          },
          {
            raw_materials: {
              [Op.substring]: query
            }
          }
        ]
      },
      offset: pageSize * (pageNum - 1),
      limit: pageSize - 0,
      attributes: {
        include: [
          [sequelize.col('category.name'), 'category_name']
        ]
      },
      // subQuery: false
    }
    const conditions2 = {
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id',['name', 'category_name']]
        },
        {
          model: GoodsPic,
          as: 'goodsPics',
          attributes: ['pic_url', ['id', 'pic_id']]
        }
      ],
      where: {
        [Op.or]: [
          {
            name: {
              [Op.substring]: query
            }
          },
          {
            raw_materials: {
              [Op.substring]: query
            }
          }
        ]
      },
      attributes: {
        include: [
          [sequelize.col('category.name'), 'category_name']
        ]
      },
      subQuery: false
    }
    let count
    if (query != '') {
      // 模糊查询数据条数
      const arr = await Goods.findAll(conditions2)
      count = arr.length
    } else {
      // 总数据条数
      count = await Goods.count()
    }
    const goods = await Goods.findAll(conditions1)
    const data = goods.map(item => {
      return item.get({plain: true})
    })
    data.forEach(item => {
      item.goodsPics.forEach(obj => {
        obj.pic_url = config.baseURL + obj.pic_url
      })
    })
    callback(null, {
      total: count,
      pageNum: pageNum - 0,
      goods: data
    })
  }
}

// 添加商品
module.exports.createGoods = async (data, callback) => {
  // 开启创建商品事务
  await _sequelize.transaction(async (createGoodsT) => {
    const {goodsPics, parameterList, ...goodsInfo} = data
    const goods = await Goods.create(goodsInfo, {transaction: createGoodsT})
    // 保存图片到本地
    await saveGoodsPics(goods.id, goodsPics)
    // 批量创建图片到数据库
    await GoodsPic.bulkCreate(goodsPics, {transaction: createGoodsT})
    parameterList.forEach((item, index) => {
      parameterList[index] = {
        good_id: goods.id,
        parameter_id: item 
      }
    })
    await GoodsParameter.bulkCreate(parameterList, {transaction: createGoodsT})
    callback(null, goods)
  })
}

// 根据id获取商品信息
module.exports.getGoodsById = async (id, callback) => {
  const conditions = {
    include: [
      {
        model: Category,
        as: 'category',
        attributes: []
      },
      {
        model: Parameter,
        through: {
          attributes: []
        }
      },
      {
        model: GoodsPic,
        as: 'goodsPics',
        attributes: ['pic_url', ['id', 'pic_id']]
      }
    ],
    where: {
      id
    },
    attributes: {
      include: [
        [sequelize.col('category.name'), 'category_name']
      ]
    }
  }
  const goods = await Goods.findOne(conditions)
  const data = goods.get({plain: true})
  data.goodsPics.forEach(item => {
    item.pic_url = config.baseURL + item.pic_url
  })
  callback(null, data)
}

// 修改商品信息
module.exports.updateGoodsInfo = async (data, callback) => {
  // 开启事务自动回滚
  await _sequelize.transaction(async (updateGoodsT) => {
    const {goodsPics, parameterList, ...goodsInfo} = data
    const goods = await Goods.findByPk(goodsInfo.id, {transaction: updateGoodsT})
    const res1 = await GoodsPic.destroy({where: {goods_id: goods.id}}, {transaction: updateGoodsT})
    // 保存图片到本地
    const arr = await saveGoodsPics(goods.id, goodsPics)
    // 批量创建图片到数据库
    await GoodsPic.bulkCreate(arr, {transaction: updateGoodsT})
    // 首先删除商品参数
    const res2 = await GoodsParameter.destroy({
      where: {
        good_id: goodsInfo.id
      }
    }, {transaction: updateGoodsT})
    parameterList.forEach((item, index) => {
      parameterList[index] = {
        good_id: goods.id,
        parameter_id: item 
      }
    })
    await GoodsParameter.bulkCreate(parameterList, {transaction: updateGoodsT})
    goods.name = goodsInfo.name
    goods.original_price = goodsInfo.original_price
    goods.discount_amount = goodsInfo.discount_amount
    goods.real_price = goodsInfo.real_price
    goods.raw_materials = goodsInfo.raw_materials
    goods.introduction = goodsInfo.introduction
    goods.category_id = goodsInfo.category_id
    await goods.save({transaction: updateGoodsT})
    callback(null, data)
  })
}

// 删除商品信息
module.exports.deleteGoodsById = async (id, callback) => {
  // 开启事务自动回滚
  await _sequelize.transaction(async (destroyGoodsT) => {
    const res = await Goods.destroy({
      where: {
        id
      }
    }, {transaction: destroyGoodsT})
    callback(null, null)
  })
}

// 保存商品图片
async function saveGoodsPics(goods_id, goodsPics) {
  const res = []
  for(let i = 0; i < goodsPics.length; i++) {
    if (goodsPics[i].pic_url.indexOf('/public/temp') == 0) {
      const arr = goodsPics[i].pic_url.split('/')
      const filename = arr[arr.length - 1]
      const targetPath = '/uploads/goods/' + filename
      await saveImage(path.join(process.cwd(), goodsPics[i].pic_url), path.join(process.cwd(), '/public' + targetPath ))
      goodsPics[i].goods_id = goods_id
      goodsPics[i].pic_url = targetPath
      res.push({
        goods_id: goods_id,
        pic_url: targetPath
      })
    } else if (goodsPics[i].pic_url.indexOf('http://') == 0) {
      const index = goodsPics[i].pic_url.indexOf('/uploads')
      res.push({
        goods_id: goods_id,
        pic_url: goodsPics[i].pic_url.slice(index)
      })
    }
  }
  return res
}

// 写入图片到本地文件
async function saveImage(srcPath, savePath) {
  await new Promise((resolve, reject) => {
    const readable = fs.createReadStream(srcPath)
    const writable = fs.createWriteStream(savePath)
    readable.pipe(writable)
    readable.on('end', function() {
      resolve('success')
    })
    readable.on('error', function() {
      reject('error')
    })
  })
}