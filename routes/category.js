/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-30 09:24:16
 * @FilePath: \VScode\learn-koa2\koa2-generator\routes\category.js
 * @LastEditTime: 2021-12-31 16:39:10
 * @LastEditors: RayseaLee
 */
const router = require('koa-router')()
const categoryController = require('../controllers/CategoryController')

// 获取分类列表
router.get('/categorys', categoryController.getAllCategorys)
// 获取分类列表及其菜品
router.get('/categorys/goods', categoryController.getCategorysAndGoods)
// 判断分类名是否已存在
router.get('/categorys/:name', categoryController.categoryIsExist)
// 创建分类
router.post('/categorys', categoryController.createCategory)
// 更新分类
router.put('/categorys', categoryController.updateCategory)
module.exports = router