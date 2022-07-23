/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-04-17 14:49:44
 * @FilePath: \koa2-generator\controllers\EvaluationController.js
 * @LastEditTime: 2022-04-18 15:58:15
 * @LastEditors: RayseaLee
 */
const evaluationService = require('../services/EvaluationService')
const catchException = require('../modules/catch')
const callback = require('../modules/callback')
 
module.exports.createEvaluation = async (ctx, next) => {
  await catchException(ctx, evaluationService.createEvaluation(ctx.request.body, callback(ctx)))
}

module.exports.getEvaluation = async (ctx, next) => {
  await catchException(ctx, evaluationService.getEvaluation(callback(ctx)))
}

module.exports.replyEvaluation = async (ctx, next) => {
  await catchException(ctx, evaluationService.replyEvaluation(ctx.request.body, callback(ctx)))
}