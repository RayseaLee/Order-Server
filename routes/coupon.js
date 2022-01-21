/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-27 17:28:06
 * @FilePath: \koa2-generator\routes\coupon.js
 * @LastEditTime: 2021-12-28 13:54:10
 * @LastEditors: RayseaLee
 */
const router = require('koa-router')()
const couponController = require('../controllers/CouponController')

// 获取所有的优惠券
router.get('/coupons', couponController.getAllCoupons)
router.get('/coupons/:id', couponController.getCouponById)
// 添加优惠券
router.post('/coupons', couponController.createCoupon)
// 更新优惠券
router.put('/coupons/:id', couponController.updateCouponById)
// 删除优惠券
router.delete('/coupons/:id', couponController.deleteCouponById)

module.exports = router
