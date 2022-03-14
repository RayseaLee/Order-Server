/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-28 14:49:26
 * @FilePath: \koa2-generator\routes\goods.js
 * @LastEditTime: 2022-03-04 15:02:39
 * @LastEditors: RayseaLee
 */
const router = require('koa-router')()
const goodsController = require('../controllers/GoodsController')

// 获取所有的商品
router.get('/goods', goodsController.getAllGoods)
// 根据id获取商品的信息
router.get('/goods/:id', goodsController.getGoodsById)
// 添加商品
router.post('/goods', goodsController.createGoods)
// 修改商品信息
router.put('/goods', goodsController.updateGoodsInfo)
// 删除商品
router.delete('/goods/:id', goodsController.deleteGoodsById)

module.exports = router