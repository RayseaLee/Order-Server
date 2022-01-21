/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-22 15:26:31
 * @FilePath: \koa2-generator\services\StoreService.js
 * @LastEditTime: 2021-12-28 09:37:35
 * @LastEditors: RayseaLee
 */
const Store = require('../models/index').Store
const Coupon = require('../models/index').Coupon
const fs = require('fs')
const path = require('path')
const baseURL = require('../config/config.default').upload_config.baseURL

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