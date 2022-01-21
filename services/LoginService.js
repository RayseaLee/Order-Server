/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-13 14:58:06
 * @FilePath: \koa2-generator\services\LoginService.js
 * @LastEditTime: 2021-12-21 09:46:01
 * @LastEditors: RayseaLee
 */
const User = require('../models').User
const sequelize = require('sequelize')
const bcrypt = require('bcryptjs')

module.exports.login = async (username, password, callback) => {
  // 查询条件
  const conditions = {
    where: {
      username,
    },
    attributes: {
      include: [
        [sequelize.col('role_id'), 'roleId']
      ],
      exclude: ['role_id']
    }
  }
  console.log(conditions)
  try {
    const user = await User.findOne(conditions)
    if (user === null) return callback('用户名不存在')
    console.log('user:', user.toJSON())
    // 用私钥解密后的密码与数据库中的密码比对
    if (bcrypt.compareSync(password, user.password)) {
      if(user.status == false) return callback('请先联系管理员授权登录')
      const {password, ...data} = user.toJSON()
      callback(null, data)
    } else {
      callback('密码错误')
    }
  } catch(err) {
    console.log(err.message)
    callback('服务器错误')
  }
}

