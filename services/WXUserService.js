/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-03-24 10:10:06
 * @FilePath: \koa2-generator\services\WXUserService.js
 * @LastEditTime: 2022-05-04 16:04:25
 * @LastEditors: RayseaLee
 */
const jwt = require('jsonwebtoken')
const WechatUser = require('../models').WechatUser
const config = require('../config/config.default')
const axios = require('axios')

module.exports.login = async (data, callback) => {
  const { nickName: nickname, gender, avatarUrl: avatar, city, province, country, code} = data
  const queryString = `appid=${config.appId}&secret=${config.appSecret}&js_code=${code}&grant_type=authorization_code`
  const wxAPI = `https://api.weixin.qq.com/sns/jscode2session?${queryString}`
  // 获取到微信API响应的openid和session_key
  const res = await axios.get(wxAPI)
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
  callback(null, {
    id: wx_users.id,
    token: signToken({openid: res.data.openid, user_id: wx_users.id})
  })
}

const signToken = (wx_user) => {
  return jwt.sign(wx_user, config.jwtSecret, {
    expiresIn: 36000
  })
}