/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-04-17 14:46:41
 * @FilePath: \koa2-generator\routes\evaluation.js
 * @LastEditTime: 2022-04-18 16:08:14
 * @LastEditors: RayseaLee
 */
const router = require('koa-router')()
const evaluationController = require('../controllers/EvaluationController')

// 新增评价
router.post('/evaluations', evaluationController.createEvaluation)
// 获取评价信息
router.get('/evaluations', evaluationController.getEvaluation)
// 商家回复
router.put('/evaluations', evaluationController.replyEvaluation)

module.exports = router