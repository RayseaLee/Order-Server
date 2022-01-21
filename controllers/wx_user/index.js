/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-09 14:10:41
 * @FilePath: \VScode\learn-koa2\koa2-generator\controllers\wx_user\index.js
 * @LastEditTime: 2022-01-18 14:34:01
 * @LastEditors: RayseaLee
 */
const jwt = require('jsonwebtoken')
const WechatUser = require('../../models/index').WechatUser
const config = require('../../config/config.default')
const axios = require('axios')

const generateToken = function(wx_user) {
  return jwt.sign(wx_user, config.jwtSecret, {
    expiresIn: 36000
  })
}

const login = async (ctx, next) => {
  const { nickName: nickname, gender, avatarUrl: avatar, city, province, country, code} = ctx.request.body
  console.log(ctx.request.body) 
  const queryString = `appid=${config.appId}&secret=${config.appSecret}&js_code=${code}&grant_type=authorization_code`
  const wxAPI = `https://api.weixin.qq.com/sns/jscode2session?${queryString}`
  try {
    // 获取到微信API响应的openid和session_key
    const res = await axios.get(wxAPI)
    // 设置查询条件
    const condition = {
      where: { 
        open_id: res.data.openid
      },
      defaults: {
        open_id: res.data.openid,
        nickname,
        avatar,
        gender,
        city,
        province,
        country
      }
    }
    const [wx_users, created] = await WechatUser.findOrCreate(condition)
    if (created) {
      console.log(wx_users.toJSON());
    } else {
      console.log(wx_users.toJSON());
    }
    const data = {
      token: generateToken({openid: res.data.openid})
    }
    ctx.send(data, 200, '登录成功')
  } catch (err) {
    console.log(err)
    ctx.send(null, 500, '服务器错误')
  }
}

const checkToken = async (ctx, next) => {
  try {
    const token = ctx.request.headers.authorization
    console.log('token:'+token)
    if (token) {
      console.log('token exist')
      jwt.verify(token, cofing.jwtSecret, (err, decoded) => {
        console.log('jwx.verify')
        if (err) {
          if (err.name === 'TokenExpiredError') {
            console.log('Token失效, 请重新登录!')
            return ctx.send(null, 401, '认证失败')
          } else {
            console.log('认证失败!')
            return ctx.send(null, 401, '认证失败')
          }
        } else {
          if (decoded.openid) {
            return ctx.send(null, 200, '认证成功')
          } else {
            return ctx.send(null, 401, '认证失败')
          }
        }
      })
    } else {
      console.log('no token')
      return ctx.send(null, 401, '认证失败')
    }
  } catch (err) {
    ctx.send(null, 500, '服务器错误')
  }
}

module.exports = {
  login,
  checkToken
}
