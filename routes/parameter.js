/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-01-11 14:59:52
 * @FilePath: \VScode\learn-koa2\koa2-generator\routes\parameter.js
 * @LastEditTime: 2022-01-11 16:15:39
 * @LastEditors: RayseaLee
 */
const router = require('koa-router')()
const parameterController = require('../controllers/ParameterController')

router.get('/params', parameterController.getAllParameters)
router.post('/params', parameterController.createParameter)
router.put('/params', parameterController.updateParameter)
router.delete('/params/:id', parameterController.deleteParameter)

module.exports = router