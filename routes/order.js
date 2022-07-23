/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-03-23 13:51:38
 * @FilePath: \koa2-generator\routes\order.js
 * @LastEditTime: 2022-04-08 09:51:30
 * @LastEditors: RayseaLee
 */
const router = require('koa-router')()
const orderController = require('../controllers/OrderController')

// 添加订单
router.post('/orders', orderController.createOrder)
// 获取所有订单信息
router.get('/orders', orderController.getAllOrderInfo)
// 更新订单状态
router.put('/orders', orderController.updateOrderStatus)


module.exports = router