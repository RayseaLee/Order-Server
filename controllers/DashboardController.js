/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-05-13 15:10:51
 * @FilePath: \koa2-generator\controllers\DashboardController.js
 * @LastEditTime: 2022-05-13 15:38:54
 * @LastEditors: RayseaLee
 */
const dashboardService = require('../services/DashboardService')
const catchException = require('../modules/catch')
const callback = require('../modules/callback')

module.exports.getTurnover = async (ctx, next) => {
  await catchException(ctx, dashboardService.getTurnover(callback(ctx)))
}

module.exports.getOrderInfo = async (ctx, next) => {
  await catchException(ctx, dashboardService.getOrderInfo(callback(ctx)))
}