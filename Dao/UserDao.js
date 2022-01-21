/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-15 14:08:19
 * @FilePath: \koa2-generator\Dao\UserDao.js
 * @LastEditTime: 2021-12-17 09:51:33
 * @LastEditors: RayseaLee
 */
const User = require('../models').User

module.exports.findByPk = async (conditions) => {
  return await User.findByPk(id, conditions)
}

module.exports.createUser = async (conditions) => {
  return await User.create(conditions)
}