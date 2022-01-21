/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-17 14:12:32
 * @FilePath: \koa2-generator\controllers\MenuController.js
 * @LastEditTime: 2021-12-17 14:25:42
 * @LastEditors: RayseaLee
 */
const menuService = require('../services/MenuService')
const catchException = require('../modules/catch')
const callback = require('../modules/callback')

// 获取左侧菜单列表
module.exports.getLeftMenus = async (ctx, next) => {
  await catchException(ctx, menuService.getLeftMenus(ctx.request.body.roleId, callback(ctx)))
}

// 获取所有的菜单权限列表
module.exports.queryAllMenus = async (ctx, next) => {
  await catchException(ctx, menuService.queryAllMenus(ctx.params.type, callback(ctx)))
}