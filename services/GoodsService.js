/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-28 14:52:44
 * @FilePath: \VScode\learn-koa2\koa2-generator\services\GoodsService.js
 * @LastEditTime: 2022-01-19 11:45:18
 * @LastEditors: RayseaLee
 */
const Goods = require('../models').Goods
const GoodsPic = require('../models').GoodsPic
const Category = require('../models').Category
const GoodsParameter = require('../models').GoodsParameter
const config = require('../config/config.default').upload_config
const path = require('path')
const fs = require('fs')
const _sequelize = require('../models').sequelize
const sequelize = require('sequelize')
const { Op } = require("sequelize");

module.exports.getAllGoods = async (params, callback) => {
  const {pageNum, pageSize, query = ''} = params
  // 获取所有的商品信息
  if(!pageNum && !pageSize) {
    const conditions = {
      include: [
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
    console.log(data)
    callback(null, data)
  }
  // 分页查询 
  else {
    const conditions = {
      include: [
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
      offset: pageSize * (pageNum - 1), 
      limit: pageSize - 0
    }
    const count = await Goods.count()
    const goods = await Goods.findAll(conditions)
    const data = goods.map(item => {
      return item.get({plain: true})
    })
    data.forEach(item => {
      item.goodsPics.forEach(obj => {
        obj.pic_url = config.baseURL + obj.pic_url
      })
    })
    console.log(data)
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

module.exports.getGoodsById = async (id, callback) => {
  const conditions = {
    include: [
      {
        model: Category,
        as: 'category',
        attributes: []
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
  console.log(data)
  callback(null, data)
}

async function saveGoodsPics(goods_id, goodsPics) {
  for(let i = 0; i < goodsPics.length; i++) {
    if(goodsPics[i].pic_url.indexOf('/public/temp') == 0) {
      const arr = goodsPics[i].pic_url.split('/')
      const filename = arr[arr.length - 1]
      const targetPath = '/uploads/goods/' + filename
      await saveImage(path.join(process.cwd(), goodsPics[i].pic_url), path.join(process.cwd(), '/public' + targetPath ))
      goodsPics[i].goods_id = goods_id
      goodsPics[i].pic_url = targetPath
    }
  }
}

// 保存图片
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