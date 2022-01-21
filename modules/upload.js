/*
 * @Description: 图片上传模块
 * @Author: RayseaLee
 * @Date: 2022-01-11 11:07:12
 * @FilePath: \VScode\learn-koa2\koa2-generator\modules\upload.js
 * @LastEditTime: 2022-01-11 11:13:00
 * @LastEditors: RayseaLee
 */
const multer = require('@koa/multer')

const upload = multer({
  dest: 'public/temp/'
})

module.exports.upload = upload