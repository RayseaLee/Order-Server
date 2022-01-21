/*
 * @Description: 登录验证、token验证中间件
 * @Author: RayseaLee
 * @Date: 2021-12-14 15:35:24
 * @FilePath: \koa2-generator\modules\passport.js
 * @LastEditTime: 2021-12-16 16:52:20
 * @LastEditors: RayseaLee
 */
const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/config.default')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = jwtSecret

// 通过登录函数初始化
/**
 * 初始化 passport 框架
 * 
 * @param  {[type]}   app       全局应用程序
 * @param  {[type]}   loginFunc 登录函数
 * @param  {Function} callback  回调函数
 */
module.exports.setup = function(app, loginFunc, callback) {
  // 用户名密码 登录策略
  passport.use(new LocalStrategy(
    function(username, password, done) {
      if(!loginFunc) return done('登录验证函数未设置')
      loginFunc(username, password, function(err, user) {
        if(err) return done(err)
        return done(null, user)
      })
    }
  ))
  // token 验证策略
  passport.use(new JwtStrategy(opts,function(jwt_payload, done) {
      console.log('jwt_payload:', jwt_payload)
      return done(null, jwt_payload)
    }
  ))
  // 初始化 passport 模块
  app.use(passport.initialize())
  if(callback) callback()
}

/**
 * 登录验证逻辑
 * 
 * @param  {[type]}   ctx  koa2上下文对象
 * @param  {Function} next [description]
 */
module.exports.login = async function(ctx, next) {
  return passport.authenticate('local', function(err, user, info) {
    if(err) return ctx.send(null, 400, err)
    if(!user) return ctx.send(null, 400, '参数错误')
    // 获取角色信息
    const token = jwt.sign(
      {
        'id':user.id, 
        'roleId': user.roleId
      }, 
      jwtSecret,
      {
        'expiresIn': 7200
      }
    )
    user.token = 'Bearer ' + token
    return ctx.send(user, 200, '登陆成功')
  })(ctx, next)
}

/**
 * token验证函数
 * 
 * @param  {[type]}   ctx  koa2上下文对象
 * @param  {Function} next 传递事件函数
 */
module.exports.tokenAuth = function(ctx, next) {
  console.log('-------------------')
  if (ctx.url == '/login' || ctx.url == '/wxlogin') {
    return next()
  }
  return passport.authenticate('jwt', {session: false}, async function(err, tokenData) {
    console.log('token验证: ');
    console.log('err:', err)
    console.log('tokenData:', tokenData)
    if(err) return ctx.send(null, 401, err)
    if(!tokenData) return ctx.send(null, 401, 'token已失效，请重新登录')
    const {id, roleId} = tokenData
    // if (ctx.request.body) {
    //   ctx.request.body.id = id
    //   ctx.request.body.role_id = role_id
    // }
    if(JSON.stringify(ctx.request.body) == '{}') {
      ctx.request.body = {
        id, 
        roleId
      }
    }
    console.log('body:', ctx.request.body)
    await next()
  })(ctx, next)
}