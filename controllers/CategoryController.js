/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-30 09:27:56
 * @FilePath: \VScode\learn-koa2\koa2-generator\controllers\CategoryController.js
 * @LastEditTime: 2021-12-31 16:40:38
 * @LastEditors: RayseaLee
 */
const categoryService = require('../services/CategoryService')
const catchException = require('../modules/catch')
const callback = require('../modules/callback')

// 获取分类列表
module.exports.getAllCategorys = async (ctx, next) => {
  await catchException(ctx, categoryService.getAllCategorys(callback(ctx)))
}
// 获取分类列表以及菜品
module.exports.getCategorysAndGoods = async (ctx, next) => {
  await catchException(ctx, categoryService.getCategoryAndGoods(callback(ctx)))
}
// 创建分类
module.exports.createCategory = async (ctx, next) => {
  await catchException(ctx, categoryService.createCategory(ctx.request.body, callback(ctx)))
}
// 更新菜品
module.exports.updateCategory = async (ctx, next) => {
  await catchException(ctx, categoryService.updateCategory(ctx.request.body, callback(ctx)))
}
// 分类名是否已存在
module.exports.categoryIsExist = async (ctx, next) => {
  await catchException(ctx, categoryService.categoryIsExist(ctx.params.name, callback(ctx)))
}