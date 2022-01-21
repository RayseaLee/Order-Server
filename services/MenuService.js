/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-14 19:15:48
 * @FilePath: \koa2-generator\services\MenuService.js
 * @LastEditTime: 2021-12-17 15:01:42
 * @LastEditors: RayseaLee
 */
const Menu = require('../models/index').Menu
const MenuDao = require('../Dao/MenuDao')

// 将菜单列表转换成树型结构
function listToTree(resouce, target) {
  for(item of resouce) {
    if(item.level == 0) {
      item.children = []
      target.push(item)
    }
  }
  for(obj of target) {
    for(item of resouce) {
      if(item.level == 1 && item.parent_id == obj.id) {
        item.children = []
        obj.children.push(item)
      }
    }
  }
}

// 获取左侧菜单
module.exports.getLeftMenus = async (roleId, callback) => {
  if(roleId == null) return callback('参数错误')
  await MenuDao.getMenusByRoleId(roleId, function(err, menus) {
    if(err) return callback(err)
    if(menus === null) return callback(null, null)
    const data = []
    listToTree(menus, data)
    callback(null, data)
  })
}

module.exports.queryAllMenus = async (type, callback) => {
  if(type == null || (type !== 'tree' && type !== 'list')) return callback('参数错误')
  const menus = await Menu.findAll({raw: true})
  if (type === 'list') {
    return callback(null, menus)
  } else {
    const data = []
    listToTree(menus, data)
    callback(null, data)
  }
}