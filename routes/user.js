/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-15 15:02:33
 * @FilePath: \VScode\learn-koa2\koa2-generator\routes\user.js
 * @LastEditTime: 2022-01-17 10:43:16
 * @LastEditors: RayseaLee
 */
const router = require('koa-router')()
const userController = require('../controllers/UserController')

// 获取所有的用户信息
router.get('/users', userController.queryAllUsers)
// 根据id获取用户信息
router.get('/users/:id', userController.getUserById)
// 用户名是否存在
router.get('/users/username/:name', userController.usernameIsExist)
// 创建用户
router.post('/users', userController.createUser)
// 更新用户信息
router.put('/users/:id', userController.updateUserInfo)
// 更新用户状态                                          
router.put('/users/:id/status/:status', userController.updateUserInfo)
// 为用户分配角色
router.put('/users/:id/role', userController.updateUserInfo)
// 根据id删除用户
router.delete('/users/:id', userController.deleteUserById)

module.exports = router