/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-01-11 15:09:39
 * @FilePath: \VScode\learn-koa2\koa2-generator\services\ParameterService.js
 * @LastEditTime: 2022-01-17 09:29:08
 * @LastEditors: RayseaLee
 */
const Parameter = require('../models').Parameter
const Goods = require('../models').Goods

module.exports.getAllParameters = async (callback) => {
  const params = await Parameter.findAll()
  callback(null, params)
}

module.exports.createParameter = async (data, callback) => {
  const {name, list} = data
  if(name == null) return callback('参数错误')
  const param = await Parameter.create({name, list})
  callback(null, param)
}

module.exports.updateParameter = async (data, callback) => {
  const {id, name, list} = data
  if(id == null || name == null) return callback('参数错误')
  const param = await Parameter.findByPk(id)
  param.name = name
  param.list = list
  await param.save()
  callback(null, param)
}

module.exports.deleteParameter = async (id, callback) => {
  if(id == null) return callback('参数错误')
  const res = await Parameter.destroy({where: {id}})
  if(res != 1) return callback('参数错误')
  callback(null, null)
}