/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-22 15:22:16
 * @FilePath: \VScode\learn-koa2\koa2-generator\routes\store.js
 * @LastEditTime: 2022-01-17 12:00:58
 * @LastEditors: RayseaLee
 */
const router = require('koa-router')()
const upload = require('../modules/upload').upload
const storeController = require('../controllers/StoreController')

// 获取店铺信息
router.get('/storefront', storeController.getStoreInfo)
// 上传店铺logo到temp目录
router.post('/storefront', upload.single('file'), storeController.updateStoreLogo)
// 更新店铺信息
router.put('/storefront', storeController.updateStoreInfo)


module.exports = router
