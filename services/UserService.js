/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-15 15:00:31
 * @FilePath: \koa2-generator\services\UserService.js
 * @LastEditTime: 2021-12-28 17:57:18
 * @LastEditors: RayseaLee
 */
const User = require('../models').User
const Role = require('../models').Role
const dao = require('../Dao/Dao')
const sequelize = require('sequelize')

const baseConditions = {
  attributes: {
    include: [
      [sequelize.col('role_id'), 'roleId']
    ],
    exclude: ['password', 'role_id']
  }
}

// 查询所有用户信息
module.exports.queryAllUsers = async (params, callback) => {
  const {pageNum = 1, pageSize = 5} = params
  const conditions = {
    include: {
      model: Role,
      as: 'role',
      attributes: [],
    },
    attributes: { 
      include: [
        [sequelize.col('role.name'), 'roleName'],
        [sequelize.col('role_id'), 'roleId']
      ],
      exclude: ['role_id', 'password', sequelize.col('role.id'), 'role.name', 'role.description', 'role.menu_list'] 
    },
    raw: true,
    offset: pageSize * (pageNum - 1),
    limit: pageSize - 0,
    order: [['id']]
  }
  const {count, rows} = await User.findAndCountAll(conditions)
  rows.forEach((item, index) => {
    rows[index].status = item.status == 1
    if(!item.roleName) {
      rows[index].roleName = item.roleId == 0 ? '超级管理员' : '新用户'
    }
  })
  const data = {
    total: count,
    pageNum: pageNum - 0,
    users: rows
  } 
  console.log('data:', data)
  callback(null, data)
}

// 添加用户
module.exports.createUser = async (userInfo, callback) => {
  console.log(userInfo);
  const {username, password} = userInfo
  if(!username || !password) return callback('参数错误')
  const user = await User.create(userInfo, baseConditions)
  const {password:pwd, ...data} = user.toJSON()
  console.log(data)
  callback(null, data)
}

// 更新用户信息
module.exports.updateUserInfo = async (userInfo, callback) => {
  const {id, email=null, status=null, roleId=null} = userInfo
  const user = await User.findByPk(id, baseConditions)
  if(email !== null) user.email = email
  if(status !== null) user.status = status
  if(roleId !== null) user.role_id = roleId
  await user.save()
  if(user === null) throw new Error('更新失败')
  console.log(user.toJSON())
  callback(null, user)
}

// // 更新用户信息
// module.exports.updateUser = async (body, callback) => {
//   const {id, email} = body
//   if(!id || !email) return callback('参数错误')
//   const user = await User.findByPk(id, baseConditions)
//   user.email = email
//   await user.save()
//   if(user === null) throw Error('更新失败')
//   console.log(user.toJSON())
//   callback(null, user)
// }

// // 更新用户状态
// module.exports.updateUserStatus = async (params, callback) => {
//   const {id, status} = params
//   if(id === null || status === null || status === undefined) return callback('参数错误')
//   const user = await User.findByPk(id, baseConditions)
//   user.status = status
//   await user.save()
//   if(user === null) throw Error('更新失败')
//   console.log(user.toJSON())
//   callback(null, user)
// }

// // 更新用户角色
// module.exports.updateUserRole = async (params, callback) => {
//   const {id, roleId} = params
//   if(id === null || roleId === null) return callback('参数错误')
//   const user = await User.findByPk(id, baseConditions)
//   user.role_id = roleId
//   await user.save()
//   if(user === null) throw Error('更新失败')
//   console.log(user.toJSON())
//   callback(null, user)
// }

// 根据id删除用户
module.exports.deleteUserById = async (id, callback) => {
  await dao.deleteById(User, id, function(err, data) {
    if(err) return callback(err)
    callback(null, data)
  })
}

// 根据id获取用户信息
module.exports.getUserById = async (id, callback) => {
  if(!id) return callback('参数错误')
  const user = await User.findByPk(id, baseConditions)
  console.log(user.toJSON())
  if(!user) return callback('Not found!')
  callback(null, user)
}

// 检查用户名是否存在
module.exports.usernameIsExist = async (username, callback) => {
  if(!username) return callback('参数错误')
  const user = await User.findOne({
    where: {
      username
    }
  })
  if(user !== null) return callback('用户名已存在') 
  callback(null, null)
}