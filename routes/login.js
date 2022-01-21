/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-04 19:04:04
 * @FilePath: \koa2-generator\routes\login.js
 * @LastEditTime: 2021-12-21 09:48:34
 * @LastEditors: RayseaLee
 */
const router = require('koa-router')()

// 后台登录验证 passport 策略
admin_passport = require('../modules/passport')
// 商户登录
router.post('/login', admin_passport.login)

module.exports = router
