/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-09 11:37:15
 * @FilePath: \VScode\learn-koa2\koa2-generator\models\index.js
 * @LastEditTime: 2022-01-17 17:21:28
 * @LastEditors: RayseaLee
 */
const Sequelize = require('sequelize')
const config = require('../config/config.default').db_config
const fs = require('fs')
const path = require('path')
const database = config.database
const username = config.username
const password = config.password
const options = {
  host: config.host,
  port: config.port,
  dialect: 'mysql',
  // 格式化时间
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  },
  timezone: '+08:00', //改为标准时区
  define: {
    syncOnAssociation: true,
    timestamps: false,
    underscored: true
  }
}

const sequelize = new Sequelize(database, username, password, options)

const models = {}

// 读取所有的 model 存入models
fs
  .readdirSync(__dirname + '/def_models')
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname + '/def_models', file))
    models[model.name] = model
  })

console.log(Object.keys(models));
// 对 models 中存在 associate 函数的 model 传入 models
Object.keys(models).forEach((modelName) => {
  if(models[modelName].options.hasOwnProperty('associate')) {
    models[modelName].options.associate(models)
  }
})

// models.User.create({
//   role_id: 0,
//   username: 'admin',
//   password: '123456',
//   email: 'raysealee@foxmail.com'
// }).then(res => {
//   console.log('创建用户成功');
// })

// models.User.destroy({
//   truncate: true
// });

sequelize.sync({ alter: true }).then(res => {
  console.log('所有模型已成功同步')
}).catch(err => {
  console.log(err)
})

module.exports = models
module.exports.sequelize = sequelize