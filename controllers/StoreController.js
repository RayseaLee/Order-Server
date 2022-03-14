/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-22 15:23:32
 * @FilePath: \koa2-generator\controllers\StoreController.js
 * @LastEditTime: 2022-03-04 18:07:50
 * @LastEditors: RayseaLee
 */
const fs = require('fs/promises')
const path = require('path')
const baseURL = require('../config/config.default').upload_config.baseURL
const storeService = require('../services/StoreService')
const catchException = require('../modules/catch')
const callback = require('../modules/callback')

// 获取店铺信息
module.exports.getStoreInfo = async (ctx, next) => {
  await catchException(ctx, storeService.getStoreInfo(callback(ctx)))
}

// 上传店铺logo
module.exports.updateStoreLogo = async (ctx, next) => {
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
}

// 更新店铺信息
module.exports.updateStoreInfo = async (ctx, next) => {
  await catchException(ctx, storeService.updateStoreInfo(ctx.request.body, callback(ctx)))
}

// 获取轮播图信息
module.exports.getSwiperInfo = async (ctx, next) => {
  await catchException(ctx, storeService.getSwiperInfo(ctx.request.query, callback(ctx)))
}

// 添加轮播图
module.exports.createSwiper = async (ctx, next) => {
  await catchException(ctx, storeService.createSwiper(ctx.request.body, callback(ctx)))
}

// 删除轮播图
module.exports.deleteSwiperById = async (ctx, next) => {
  await catchException(ctx, storeService.deleteSwiperById(ctx.params.id, callback(ctx)))
}