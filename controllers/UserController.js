/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-15 15:31:46
 * @FilePath: \koa2-generator\controllers\userController.js
 * @LastEditTime: 2021-12-20 14:02:10
 * @LastEditors: RayseaLee
 */
const userService = require('../services/UserService')
const catchException = require('../modules/catch')
const callback = require('../modules/callback')

// 查询所有用户
module.exports.queryAllUsers = async (ctx, next) => {
  await catchException(ctx, userService.queryAllUsers(ctx.request.query, callback(ctx)))
}

// 添加用户
module.exports.createUser = async (ctx, next) => {
  await catchException(ctx, userService.createUser(ctx.request.body, callback(ctx)))
}

// 更新用户信息
module.exports.updateUserInfo = async (ctx, next) => {
  const id = ctx.params.id,
        email = ctx.request.body.email ? ctx.request.body.email : null,
        status = ctx.params.status ? ctx.params.status : null,
        roleId = ctx.request.body.roleId ? ctx.request.body.roleId : null
  await catchException(ctx, userService.updateUserInfo({id, email, status, roleId}, callback(ctx)))
}

// 根据id删除用户
module.exports.deleteUserById = async (ctx, next) => {
  if(ctx.params.id == 1) return ctx.send(null, 403, 'FORBIDDEN')
  await catchException(ctx, userService.deleteUserById(ctx.params.id, callback(ctx)))
}

// 根据id获取用户信息
module.exports.getUserById = async (ctx, next) => {
  await catchException(ctx, userService.getUserById(ctx.params.id, callback(ctx)))
}

// 用户名是否存在
module.exports.usernameIsExist = async (ctx, next) => {
  await catchException(ctx, userService.usernameIsExist(ctx.params.name, callback(ctx)))
}
