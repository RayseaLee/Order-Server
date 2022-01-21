/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-16 15:51:38
 * @FilePath: \koa2-generator\routes\role.js
 * @LastEditTime: 2021-12-21 09:48:15
 * @LastEditors: RayseaLee
 */
const router = require('koa-router')()
const roleController = require('../controllers/RoleController')

// 获取角色列表以及对应的权限
router.get('/roles', roleController.queryAllRoles)
// 根据id获取角色信息
router.get('/roles/:id', roleController.getRoleById)
// 添加一个角色
router.post('/roles', roleController.createRole)
// 更新角色信息
router.put('/roles/:id', roleController.updateRole)
// 根据id删除角色
router.delete('/roles/:id', roleController.deleteRoleById)
// 根据角色id和权限菜单id删除角色对应的权限
router.delete('/roles/:id/rights/:rid', roleController.deleteRightsById)

module.exports = router
