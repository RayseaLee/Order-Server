/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-15 10:11:52
 * @FilePath: \koa2-generator\Dao\MenuDao.js
 * @LastEditTime: 2021-12-20 14:46:27
 * @LastEditors: RayseaLee
 */
const Menu = require('../models').Menu
const Role = require('../models').Role
const { Op } = require("sequelize")

module.exports.getMenusByRoleId = async function(roleId, callback) {
  // 超级管理员
  if (roleId == 0) {
    const menus = await Menu.findAll({ raw: true })
    if(menus === null) return callback(null, null)
    console.log(menus)
    callback(null, menus)
  } else if (roleId == -1) {
    callback(null, null)
  } else {
    const role = await Role.findByPk(roleId)
    if(role === null)  return callback('参数错误')
    if(role.menu_list === null) return callback(null, null)
    const roleArr = role.menu_list.split(',')
    const conditions = {
      where: {
        id: {
          [Op.in]: roleArr
        }
      },
      raw: true 
    }
    const menus = await Menu.findAll(conditions)
    console.log(menus)
    callback(null, menus)
  }
}

module.exports.findMenuByLevel = async (level) => {
  const menus = await Menu.findAll({
    raw: true,
    where: {
      level
    }
  })
  const arr = []
  if(menus == null) return arr
  menus.forEach(item => {
    arr.push(item.id)
  })
  return arr
}