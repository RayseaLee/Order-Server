/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-16 15:52:25
 * @FilePath: \koa2-generator\controllers\roleController.js
 * @LastEditTime: 2021-12-20 14:06:28
 * @LastEditors: RayseaLee
 */
const roleService = require('../services/RoleService')
const catchException = require('../modules/catch')
const callback = require('../modules/callback')

// 获取角色列表以及对应的权限
module.exports.queryAllRoles = async (ctx, next) => {
  await catchException(ctx, roleService.queryAllRoles(callback(ctx)))
}

// 添加一个角色
module.exports.createRole = async (ctx, next) => {
  await catchException(ctx, roleService.createRole(ctx.request.body, callback(ctx)))
}

module.exports.updateRole = async (ctx, next) => {
  const id = ctx.params.id,
        roleName = ctx.request.body.roleName || null,
        roleDesc = ctx.request.body.roleDesc || null,
        rids = ctx.request.body.rids || null
  await catchException(ctx, roleService.updateRole({id, roleName, roleDesc, rids}, callback(ctx)))
}

module.exports.deleteRoleById = async (ctx, next) => {
  await catchException(ctx, roleService.deleteRoleById(ctx.params.id, callback(ctx)))
}

module.exports.deleteRightsById = async (ctx, next) => {
  await catchException(ctx, roleService.deleteRightsById(ctx.params, callback(ctx)))
}

module.exports.getRoleById = async (ctx, next) => {
  await catchException(ctx, roleService.getRoleById(ctx.params.id, callback(ctx)))
}