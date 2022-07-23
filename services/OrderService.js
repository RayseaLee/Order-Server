/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-03-23 13:54:31
 * @FilePath: \koa2-generator\services\OrderService.js
 * @LastEditTime: 2022-05-22 17:41:57
 * @LastEditors: RayseaLee
 */
const Order = require('../models').Order
const OrderGoods = require('../models').OrderGoods
const Goods = require('../models').Goods
const GoodsPic = require('../models').GoodsPic
const WechatUser = require('../models').WechatUser
const Table = require('../models').Table
const {baseURL} = require('../config/config.default').upload_config
const _sequelize = require('../models').sequelize
const sequelize = require('sequelize')
const ws = require('../modules/websockets')


module.exports.createOrder = async (data, callback) => {
  let newData
  await _sequelize.transaction(async (createOrderT) => {
    const {user_id, table_id, total_price, discount_price, deal_price, remark, meals_number, number, status, goodsInfo} = data
    const date = new Date()
    const dateValue = date.valueOf()
    const order_id = dateValue + '' + Math.round(Math.random()*89999 + 10000)
    const order = await Order.create({
      order_id,
      user_id,
      table_id,
      total_price,
      discount_price,
      deal_price,
      number,
      meals_number,
      status,
      remark
    }, {transaction: createOrderT})
    const table = await Table.findByPk(table_id, {transaction: createOrderT})
    table.occupy = true
    if(status == '进行中') {
      table.complete = false
    }
    await table.save({transaction: createOrderT})
    goodsInfo.forEach((item, index) => {
      goodsInfo[index].order_id = order.id
    })
    const goods = await OrderGoods.bulkCreate(goodsInfo, {transaction: createOrderT})
    newData = {
      orderInfo: order
    }
    callback(null, {
      orderInfo: order,
      goodsInfo: goods
    })
    if(ws.sendToCliect) {
      ws.sendToCliect(newData)
    }
  })
}

module.exports.getAllOrderInfo = async (ctx, callback) => {
  const {pageSize = 5, pageNum = 1, status} = ctx.request.query
  const { user_id } = ctx.request.body
  let total, conditions = {
    order: [
      ['order_time', 'DESC'],
    ],
    where: {}
  }
  if (user_id) {
    conditions['where']['user_id'] = user_id
  }
  if (status) {
    conditions['where']['status'] = status 
    const order = await Order.findAll(conditions)
    total = order.length
  } else {
    const order = await Order.findAll()
    total = order.length
  }
  if (pageSize != '' && pageNum != '') {
    conditions['offset'] = pageSize * (pageNum - 1)
    conditions['limit'] = pageSize - 0
  } 
  const orders = await Order.findAll({
    ...conditions,
    include: [
      {
        model: Goods,
        as: 'goodsInfo',
        attributes: ['name'],
        // attributes: [sequelize.col('OrderGoods.params'), sequelize.col('OrderGoods.unit_price'), sequelize.col('OrderGoods.total_price'), sequelize.col('OrderGoods.number'), 'name'],
        through: {
          as: 'orderGoods',
          attributes: ['params', 'unit_price', 'total_price', 'number']
          // attributes: []
        },
        include: [
          {
            model: GoodsPic,
            as: 'goodsPics',
            attributes: ['pic_url', ['id', 'pic_id']]
          }
        ],
      },
      {
        model: WechatUser,
        as: 'wx_user',
        attributes: ['nickname', 'avatar', 'gender']
      },
      {
        model: Table,
        as: 'table',
        attributes: [],
        required: true
      }
    ],
    attributes: {
      include: [
        [sequelize.col('table.name'), 'table_name'],
      ],
    },
  })
  const data = orders.map(item => {
    return item.get({plain: true})
  })
  data.forEach(orderItem => {
    orderItem.goodsInfo.forEach(goodsItem => {
      goodsItem.goodsPics.forEach(picItem => {
        picItem.pic_url = baseURL + picItem.pic_url
      })
    })
  })
  callback(null, {
    orders: data,
    pageNum,
    total
  })
}

module.exports.updateOrderStatus = async (data, callback) => {
  const { id, status, finish_time, table_id } = data
  const order = await Order.findByPk(id)
  const table = await Table.findByPk(table_id)
  if ((order.status == '进行中' && (status == '已完成' || status == '已取消')) || (order.status == '待支付' && (status == '进行中' || status == '已取消'))) {
    order.status = status
    if (status != '进行中') {
      order.finish_time = finish_time
       if (status == '已完成') {
        table.occupy = true
        table.complete = true
      } else {
        table.occupy = false
        table.complete = null
      }
    } else {
      table.complete = false
    }
    await order.save()
    await table.save()
    if(order === null) throw new Error('更新失败')
    if(table === null) throw new Error('更新失败')
    callback(null, order)
  } else {
    return callback('操作异常')
  }
}