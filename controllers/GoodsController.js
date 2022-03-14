/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-28 14:52:13
 * @FilePath: \koa2-generator\controllers\GoodsController.js
 * @LastEditTime: 2022-03-04 15:01:57
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

// 修改商品信息
module.exports.updateGoodsInfo = async (ctx, next) => {
  await catchException(ctx, goodsService.updateGoodsInfo(ctx.request.body, callback(ctx)))
}

// 删除商品
module.exports.deleteGoodsById = async (ctx, next) => {
  await catchException(ctx, goodsService.deleteGoodsById(ctx.params.id, callback(ctx)))
}