/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-09 13:34:07
 * @FilePath: \koa2-generator\routes\wx_user.js
 * @LastEditTime: 2021-12-21 09:49:03
 * @LastEditors: RayseaLee
 */
const router = require('koa-router')()
const wx_user = require('../controllers/wx_user')

// 微信用户登录
router.post('/wxlogin', wx_user.login)
router.post('/auth', wx_user.checkToken)

module.exports = router
