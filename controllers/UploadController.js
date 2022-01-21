/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-21 15:18:48
 * @FilePath: \VScode\learn-koa2\koa2-generator\controllers\UploadController.js
 * @LastEditTime: 2022-01-17 14:06:30
 * @LastEditors: RayseaLee
 */
const fs = require('fs/promises')
const path = require('path')
const baseURL = require('../config/config.default').upload_config.baseURL

module.exports.uploadTempImg = async (ctx, next) => {
  try {
    console.log(ctx.request.file)
    const fileExtArray = ctx.request.file.originalname.split(".")
	  const ext = fileExtArray[fileExtArray.length - 1]
    const targetPath = '/temp/' + ctx.request.file.filename + '.' + ext
    await fs.rename(path.join(process.cwd(), '/' + ctx.request.file.path), path.join(process.cwd(), 'public' + targetPath))
    ctx.send({'temp_path': '/public' + targetPath, 'url': baseURL + targetPath}, 201, '上传成功')
  } catch (err) {
    console.log(err)
    ctx.send(null, 500, '服务器错误')
  }
  // try {
  //   const fileExtArray = ctx.request.file.originalname.split('.')
  //   const ext = fileExtArray[fileExtArray.length - 1]
  //   const targetPath = ctx.request.file.path + '.' + ext
  //   await fs.rename(path.join(process.cwd(), '/' + ctx.request.file.path), path.join(process.cwd(), targetPath))
  //   ctx.send({'path': targetPath, 'url': baseURL + '/' + targetPath}, 200, '上传成功')
  //   await next()
  // } catch (err) {
  //   console.log(err)
  //   ctx.send(null, 500, '图片上传失败')
  // }
}

