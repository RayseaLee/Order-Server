/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-14 19:23:52
 * @FilePath: \koa2-generator\routes\menu.js
 * @LastEditTime: 2021-12-21 09:48:24
 * @LastEditors: RayseaLee
 */
const router = require('koa-router')()
const menuController = require('../controllers/MenuController')

// 获取左侧导航栏菜单列表
router.get('/menus', menuController.getLeftMenus)
// 获取所有的权限菜单列表
router.get('/rights/:type', menuController.queryAllMenus)

module.exports = router