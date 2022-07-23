/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-05-13 15:11:37
 * @FilePath: \koa2-generator\routes\dashboard.js
 * @LastEditTime: 2022-05-13 15:39:41
 * @LastEditors: RayseaLee
 */
const router = require('koa-router')()
const dashboardController = require('../controllers/DashboardController')

// 获取营业额
router.get('/dashboard/turnover', dashboardController.getTurnover)
// 获取订单信息
router.get('/dashboard/orders', dashboardController.getOrderInfo)
module.exports = router