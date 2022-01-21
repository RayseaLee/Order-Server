/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-27 17:36:38
 * @FilePath: \koa2-generator\controllers\CouponController.js
 * @LastEditTime: 2021-12-28 13:52:37
 * @LastEditors: RayseaLee
 */
const couponService = require('../services/CouponService')
const catchException = require('../modules/catch')
const callback = require('../modules/callback')

module.exports.getAllCoupons = async (ctx, next) => {
  await catchException(ctx, couponService.getAllCoupons(callback(ctx)))
}

module.exports.createCoupon = async (ctx, next) => {
  await catchException(ctx, couponService.createCoupon(ctx.request.body, callback(ctx)))
}

module.exports.updateCouponById = async (ctx, next) => {
  await catchException(ctx, couponService.updateCouponById({id: ctx.params.id, couponInfo: ctx.request.body}, callback(ctx)))
}

module.exports.deleteCouponById = async (ctx, next) => {
  await catchException(ctx, couponService.deleteCouponById(ctx.params.id, callback(ctx)))
}

module.exports.getCouponById = async (ctx, next) => {
  await catchException(ctx, couponService.getCouponById(ctx.params.id, callback(ctx)))
}