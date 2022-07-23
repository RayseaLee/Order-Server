/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-04-17 14:50:33
 * @FilePath: \koa2-generator\services\EvaluationService.js
 * @LastEditTime: 2022-04-18 16:00:41
 * @LastEditors: RayseaLee
 */
const Evaluation = require('../models/index').Evaluation
const Order = require('../models/index').Order
const Goods = require('../models/index').Goods
const WechatUser = require('../models/index').WechatUser
const sequelize = require('sequelize')
const {baseURL} = require('../config/config.default').upload_config
const _sequelize = require('../models').sequelize

module.exports.createEvaluation = async (data, callback) => {
  await _sequelize.transaction(async (createEvaluationT) => { 
    const evaluation = await Evaluation.create(data, {transaction: createEvaluationT})
    const order = await Order.findByPk(evaluation.order_id, {transaction: createEvaluationT})
    order.evaluated = true
    await order.save({transaction: createEvaluationT})
    callback(null, evaluation)
  })
}

module.exports.getEvaluation = async (callback) => {
  const evaluations = await Evaluation.findAll({
    include: [
      {
        model: WechatUser,
        as: 'wx_user',
        attributes: [],
        required: true
      },
      {
        model: Order,
        as: 'order',
        attributes: ['id', 'deal_price'],
        required: true,
        include: {
          model: Goods,
          as: 'goodsInfo',
          attributes: ['name'],
          through: {
            as: 'orderGoods',
            attributes: []
          },
        }
      }
    ],
    attributes: {
      include: [
        [sequelize.col('wx_user.nickname'), 'username'],
        [sequelize.col('wx_user.avatar'), 'user_avatar'],
      ],
    },
  })
  const data = evaluations.map(item => {
    return item.get({plain: true})
  })
  data.forEach(item => {
    if(item.anonymous) {
      item.username = '匿名用户',
      item.user_avatar = baseURL + '/uploads/avatar/anonymous_avatar.png'
    }
  });
  callback(null, data)
}

module.exports.replyEvaluation = async (data, callback) => {
  const {id, reply, reply_time} = data
  const evaluation = await Evaluation.findByPk(id)
  if(!evaluation) return callback('参数错误')
  evaluation.reply = reply
  evaluation.reply_time = reply_time
  await evaluation.save()
  callback(null, evaluation)
}