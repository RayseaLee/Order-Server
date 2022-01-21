/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-21 09:50:23
 * @FilePath: \VScode\learn-koa2\koa2-generator\routes\upload.js
 * @LastEditTime: 2022-01-17 14:07:08
 * @LastEditors: RayseaLee
 */
const router = require('koa-router')()
const upload = require('../modules/upload').upload
// const multer = require('@koa/multer')
const uploadController = require('../controllers/UploadController')

// const upload = multer({
//   dest: 'public/uploads/'
// })

// 上传图片
router.post('/upload', upload.single('file'), uploadController.uploadTempImg) 

module.exports = router