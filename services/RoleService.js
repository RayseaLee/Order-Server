/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-16 15:57:25
 * @FilePath: \koa2-generator\services\RoleService.js
 * @LastEditTime: 2021-12-22 11:12:11
 * @LastEditors: RayseaLee
 */
const Role = require('../models/index').Role
const User = require('../models/index').User
const menuDao = require('../Dao/MenuDao')
const Menu = require('../models/index').Menu
const dao = require('../Dao/Dao')
const {listToTree} = require('../utils')
const sequelize = require('sequelize')

const baseConditions = {
  attributes: {
    include: [
      [sequelize.col('name'), 'roleName'],
      [sequelize.col('description'), 'roleDesc']
    ],
    exclude: ['name', 'description', 'menu_list']
  }
}

// 获取角色列表以及对应的权限
module.exports.queryAllRoles = async (callback) => {
  const roles = await Role.findAll({
    raw: true,
    ...baseConditions
  })
  if(roles == null) throw new Error('查询出错')
  const len = roles.length
  for(let i=0; i<len; i++) {
    await menuDao.getMenusByRoleId(roles[i].id, function(err, data) {
      if(err) return callback(null, 400, err)
      roles[i].children = listToTree(data)
    })
  }
  console.log(roles)
  callback(null, roles)
}

// 创建一个角色
module.exports.createRole = async (roleInfo, callback) => {
  const {roleName:name, roleDesc:description} = roleInfo
  if(name == null) return callback('参数错误')
  const role = await Role.create({name, description})
  if(role == null) return callback('创建失败')
  console.log(role.toJSON())
  callback(null, role)
}

module.exports.updateRole = async (roleInfo, callback) => {
  const {id, roleName, roleDesc, rids} = roleInfo
  if(id == null) return callback('参数错误')
  const role = await Role.findByPk(id, baseConditions)
  if(roleName !== null) role.name= roleName
  if(roleDesc !== null) role.description = roleDesc
  if(rids !== null) role.menu_list = rids
  await role.save()
  if(role === null) throw new Error('更新失败')
  console.log(role.toJSON())
  callback(null, role)
}

// 根据id删除角色
module.exports.deleteRoleById = async (id, callback) => {
  await User.update({role_id: -1}, {
    where: {
      role_id: id
    }
  })
  await dao.deleteById(Role, id, function(err, data) {
    if(err) return callback(err)
    callback(null, data)
  })
}

// 根据角色id和权限id删除角色的权限
module.exports.deleteRightsById = async (params, callback) => {
  const {id, rid} = params
  if(id == null || rid == null) return callback('参数错误')
  // 根据角色id获取角色
  const role = await Role.findByPk(id)
  // 根据权限id获取菜单详细数据
  const menu = await Menu.findByPk(rid)
  // 菜单等级
  const level = menu.level
  let menus, menusLevel2 = [], result = [], rids = []
  // 获取角色对应的权限菜单
  await menuDao.getMenusByRoleId(id, function(err, data) {
    if(err) return callback(err)
    menus = data
  })
  // 分别处理一、二、三级菜单
  if (level == 0) {
    for(item of menus) {
      if(item.parent_id == rid) {
        menusLevel2.push(item.id)
      }
    }
    for(item of menus) {
      if(item.parent_id != rid && !menusLevel2.includes(item.parent_id) && item.id != rid ) {
        result.push(item)
      }
    }
  } else if (level == 1) {
    for(item of menus) {
      if(item.parent_id != rid && item.id != rid) {
        result.push(item)
      }
    }
  } else {
    for(item of menus) {
      if(item.id != rid) {
        result.push(item)
      }
    }
  }
  // 得到处理后的权限菜单id列表
  for(item of result) {
    rids.push(item.id)
  }
  role.menu_list = rids.join(',')
  await role.save()
  callback(null, listToTree(result))
}

module.exports.getRoleById = async (id, callback) => {
  if(id == null) return callback('参数错误')
  const role = await Role.findByPk(id, baseConditions)
  if(role == null) return callback('查询失败')
  callback(null, role)
}