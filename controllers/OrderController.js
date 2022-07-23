/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-03-23 13:53:25
 * @FilePath: \koa2-generator\controllers\OrderController.js
 * @LastEditTime: 2022-04-12 10:00:54
 * @LastEditors: RayseaLee
 */
const orderService = require('../services/OrderService')
const catchException = require('../modules/catch')
const callback = require('../modules/callback')

module.exports.createOrder = async (ctx, next) => { 
  await catchException(ctx, orderService.createOrder(ctx.request.body, callback(ctx)))
}

module.exports.getAllOrderInfo = async (ctx, next) => {
  await catchException(ctx, orderService.getAllOrderInfo(ctx, callback(ctx)))
}

module.exports.updateOrderStatus = async (ctx, next) => {
  await catchException(ctx, orderService.updateOrderStatus(ctx.request.body, callback(ctx)))
}