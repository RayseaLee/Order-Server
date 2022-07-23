/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-09 13:34:07
 * @FilePath: \koa2-generator\routes\wx_user.js
 * @LastEditTime: 2022-03-24 10:31:33
 * @LastEditors: RayseaLee
 */
const router = require('koa-router')()
const WXUserController = require('../controllers/WXUserController')

// 微信用户登录
router.post('/wxlogin', WXUserController.login)
// 鉴权
router.post('/auth', WXUserController.checkToken)

module.exports = router
