/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-28 14:52:13
 * @FilePath: \VScode\learn-koa2\koa2-generator\controllers\GoodsController.js
 * @LastEditTime: 2022-01-17 15:13:18
 * @LastEditors: RayseaLee
 */
const goodsService = require('../services/GoodsService')
const catchException = require('../modules/catch')
const callback = require('../modules/callback')

// 获取所有的商品信息
module.exports.getAllGoods = async (ctx, next) => {
  await catchException(ctx, goodsService.getAllGoods(ctx.request.query, callback(ctx)))
}

// 根据id获取商品信息
module.exports.getGoodsById = async (ctx, next) => {
  await catchException(ctx, goodsService.getGoodsById(ctx.params.id, callback(ctx)))
}

// 添加商品
module.exports.createGoods = async (ctx, next) => {
  await catchException(ctx, goodsService.createGoods(ctx.request.body, callback(ctx)))
}