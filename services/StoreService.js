/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-22 15:26:31
 * @FilePath: \koa2-generator\services\StoreService.js
 * @LastEditTime: 2022-03-05 15:15:36
 * @LastEditors: RayseaLee
 */
const Store = require('../models/index').Store
const Swiper = require('../models/index').Swiper
const fs = require('fs')
const path = require('path')
const baseURL = require('../config/config.default').upload_config.baseURL

// 获取店铺信息
module.exports.getStoreInfo = async (callback) => {
  const storeInfo = await Store.findAll({raw: true})
  storeInfo[0]['logo'] = baseURL + storeInfo[0]['logo']
  callback(null, storeInfo[0])
}

// module.exports.uploadStoreLogo = async (url, callback) => {
//   if(url == '') return callback(null, 400, '参数错误')
//   const store = await Store.findByPk(1)
//   store.logo = url
//   await store.save()
//   callback(null, store)
// }

// 更新店铺信息
module.exports.updateStoreInfo = async (data, callback) => {
  const {coupons, logo, ...storeInfo} = data
  if(storeInfo['temp_path']) {
    const arr = logo.split('/')
    const filename = arr[arr.length - 1]
    const targetPath = '/uploads/logo/' + filename
    await saveImage(path.join(process.cwd(), storeInfo['temp_path']), path.join(process.cwd(), '/public' + targetPath ))
    storeInfo['logo'] = targetPath
  }
  const res = await Store.update(storeInfo, {where: {id: 1}})
  const store = await Store.findByPk(1, {raw: true})
  store['logo'] = baseURL + store['logo']
  console.log(store)
  callback(null, store)
}

// 获取轮播图信息
module.exports.getSwiperInfo = async (params, callback) => {
  const {pageNum = 1, pageSize = 5} = params
  const {count, rows} = await Swiper.findAndCountAll({
    offset: pageSize * (pageNum - 1), 
    limit: pageSize - 0,
    raw: true
  })
  rows.forEach((item, index) => {
    rows[index].pic_url = baseURL + item.pic_url
  });
  console.log(rows)
  callback(null, {
    total: count,
    swipers: rows
  })
}

// 添加轮播图
module.exports.createSwiper = async (data, callback) => {
  const {url, temp_path} = data
  const arr = temp_path.split('/')
  const filename = arr[arr.length - 1]
  const targetPath = '/uploads/swipers/' + filename
  await saveImage(path.join(process.cwd(), temp_path), path.join(process.cwd(), '/public' + targetPath ))
  const swiper = await Swiper.create({
    pic_url: targetPath
  })
  if(swiper) callback(null, swiper)
  else callback('参数错误')
}

// 删除轮播图
module.exports.deleteSwiperById = async (id, callback) => {
  if(id == null) return callback('参数错误')
  const res = await Swiper.destroy({where: {id}})
  if(res != 1) return callback('参数错误')
  callback(null, null)
}

// 保存图片
async function saveImage(srcPath, savePath) {
  await new Promise((resolve, reject) => {
    const readable = fs.createReadStream(srcPath)
    const writable = fs.createWriteStream(savePath)
    readable.pipe(writable)
    readable.on('end', function() {
      resolve('success')
    })
    readable.on('error', function() {
      reject('error')
    })
  })
}