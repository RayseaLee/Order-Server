/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-27 17:38:21
 * @FilePath: \koa2-generator\services\CouponService.js
 * @LastEditTime: 2021-12-28 13:53:47
 * @LastEditors: RayseaLee
 */
const Coupon = require('../models/index').Coupon

module.exports.getAllCoupons = async (callback) => {
  const coupons = await Coupon.findAll({raw: true})
  callback(null, coupons)
}

module.exports.createCoupon = async ({full, subtract}, callback) => {
  if(full == null || subtract == null) return callback('参数错误')
  const coupon = await Coupon.create({full, subtract})
  callback(null, coupon)
}

module.exports.updateCouponById = async ({id, couponInfo}, callback) => {
  const {full, subtract} = couponInfo
  if(id == null || full == null || subtract == null) return callback('参数错误')
  const coupon = await Coupon.findByPk(id)
  coupon.full = full
  coupon.subtract = subtract
  await coupon.save()
  callback(null, coupon)
}

module.exports.deleteCouponById = async (id, callback) => {
  if(id == null) return callback('参数错误')
  await Coupon.destroy({where: {id}})
  callback(null, null)
}

module.exports.getCouponById = async (id, callback) => {
  if(id == null) return callback('参数错误')
  const coupon = await Coupon.findByPk(id)
  callback(null, coupon)
}