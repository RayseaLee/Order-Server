/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-30 09:30:52
 * @FilePath: \VScode\learn-koa2\koa2-generator\services\CategoryService.js
 * @LastEditTime: 2021-12-31 14:53:00
 * @LastEditors: RayseaLee
 */
const Category = require('../models/index').Category
const Goods = require('../models/index').Goods

// 获取商品分类列表
module.exports.getAllCategorys = async (callback) => {
  const categorys = await Category.findAll({raw: true})
  callback(null, categorys)
}

// 获取商品分类及其商品信息
module.exports.getCategoryAndGoods = async (callback) => {
  const conditions = {
    include: {
      model: Goods,
      as: 'goods',
      attributes: ['id', 'name']
    }
  }
  const categorys = await Category.findAll(conditions)
  callback(null, categorys)
}

// 添加商品分类
module.exports.createCategory = async ({name}, callback) => {
  if(name == null) return callback('参数错误')
  const category = await Category.create({name})
  callback(null, category)
}

// 更新商品分类
module.exports.updateCategory = async ({id, name}, callback) => {
  if(id == null || name == null) return callback('参数错误')
  const category = await Category.findByPk(id)
  category.name = name
  await category.save()
  callback(null, category)
}

// 删除商品分类
module.exports.deleteCategory = async (id, callback) => {
  if(id == null) return callback('参数错误')
  await Category.destroy({where: {id}})
  callback(null, null)
}

module.exports.categoryIsExist = async (name, callback) => {
  if(name == null) return callback('参数错误')
  const category = await Category.findOne({where: {name}})
  if(category !== null) return callback('分类名已存在')
  callback(null, null)
}