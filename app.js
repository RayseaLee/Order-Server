/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-04 19:04:04
 * @FilePath: \koa2-generator\app.js
 * @LastEditTime: 2022-05-13 15:15:21
 * @LastEditors: RayseaLee
 */
const Koa = require('koa')
const app = new Koa()
// const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const router = require('koa-router')() // 引入koa-router
const path = require('path')

// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

/**
 * 后台管理系统初始化
 */

// 获取管理用户逻辑模块
const LoginService = require(path.join(process.cwd(), 'services/LoginService'))

// 设置跨域和相应数据格式
app.use(
  cors({
      origin: function(ctx) { //设置允许来自指定域名请求
          if (ctx.url === '/test') {
              return '*'; // 允许来自所有域名请求
          }
          return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
      },
      maxAge: 5, //指定本次预检请求的有效期，单位为秒。
      credentials: true, //是否允许发送Cookie 
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法'
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  })
);

// 静态资源服务
app.use(require('koa-static')(__dirname + '/public'))

// 初始化统一响应机制
const ctxbody = require('./modules/ctxbody')
app.use(ctxbody)

// 初始化后台登录 passport 策略
admin_passport = require('./modules/passport')
// 设置登录模块的登录函数衔接 passport 策略
admin_passport.setup(app, LoginService.login)
// token验证
app.use(admin_passport.tokenAuth)

// RSA 解密
const decrypt = require('./modules/decrypt')
app.use(decrypt)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 配置路由地址
const login = require('./routes/login')
const wx_user = require('./routes/wx_user')
const menu = require('./routes/menu')
const user = require('./routes/user')
const role = require('./routes/role')
const upload = require('./routes/upload')
const store = require('./routes/store')
const coupon = require('./routes/coupon')
const goods = require('./routes/goods')
const category = require('./routes/category')
const parameter = require('./routes/parameter')
const order = require('./routes/order')
const evaluation = require('./routes/evaluation')
const dashboard = require('./routes/dashboard')

// 配置路由
app.use(login.routes(), login.allowedMethods())
app.use(wx_user.routes(), wx_user.allowedMethods())
app.use(menu.routes(), menu.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(role.routes(), role.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())
app.use(store.routes(), store.allowedMethods())
app.use(coupon.routes(), coupon.allowedMethods())
app.use(goods.routes(), goods.allowedMethods())
app.use(category.routes(), category.allowedMethods())
app.use(parameter.routes(), parameter.allowedMethods())
app.use(order.routes(), order.allowedMethods())
app.use(evaluation.routes(), evaluation.allowedMethods())
app.use(dashboard.routes(), dashboard.allowedMethods())

// 错误处理
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
