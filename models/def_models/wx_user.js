/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-09 11:20:36
 * @FilePath: \koa2-generator\models\def_models\wx_user.js
 * @LastEditTime: 2021-12-13 09:39:34
 * @LastEditors: RayseaLee
 */
module.exports = function(sequelize, DataTypes) {
  const WechatUser = sequelize.define('WechatUser', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    open_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
    },
    avatar: { 
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.INTEGER,
    },
    city: {
      type: DataTypes.STRING
    },
    province: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    },
  }, {
    tableName: 'wx_users',
  })
  return WechatUser
}