/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-03-24 09:58:51
 * @FilePath: \koa2-generator\controllers\WXUserController.js
 * @LastEditTime: 2022-03-24 10:38:54
 * @LastEditors: RayseaLee
 */
const wxUserService = require('../services/WXUserService')
const catchException = require('../modules/catch')
const callback = require('../modules/callback')

module.exports.login = async (ctx, next) => {
  await catchException(ctx, wxUserService.login(ctx.request.body, callback(ctx)))
}

module.exports.checkToken = async (ctx, next) => {
  await catchException(ctx, wxUserService.checkToken(ctx.request.headers, callback(ctx)))
}