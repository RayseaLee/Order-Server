/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-01-11 15:00:42
 * @FilePath: \VScode\learn-koa2\koa2-generator\controllers\ParameterController.js
 * @LastEditTime: 2022-01-12 09:06:36
 * @LastEditors: RayseaLee
 */
const parameterService = require('../services/ParameterService')
const catchException = require('../modules/catch')
const callback = require('../modules/callback')

// 获取动态参数列表
module.exports.getAllParameters = async (ctx, next) => {
  await catchException(ctx, parameterService.getAllParameters(callback(ctx)))
}

// 创建动态参数
module.exports.createParameter = async (ctx, next) => {
  await catchException(ctx, parameterService.createParameter(ctx.request.body, callback(ctx)))
}

// 更新动态参数
module.exports.updateParameter = async (ctx, next) => {
  await catchException(ctx, parameterService.updateParameter(ctx.request.body, callback(ctx)))
}

// 删除动态参数
module.exports.deleteParameter = async (ctx, next) => {
  await catchException(ctx, parameterService.deleteParameter(ctx.params.id, callback(ctx)))
}