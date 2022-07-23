/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-05-13 15:33:54
 * @FilePath: \koa2-generator\services\DashboardService.js
 * @LastEditTime: 2022-05-13 15:38:29
 * @LastEditors: RayseaLee
 */
const Order = require('../models').Order

module.exports.getTurnover = async (callback) => {
  const turnover = await Order.sum('deal_price', {where: {'status': '已完成'}})
  if(turnover) {
    callback(null, turnover)
  }
}

module.exports.getOrderInfo = async (callback) => {
  const order = await Order.findAll()
  callback(null, order)
}