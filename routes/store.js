/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-22 15:22:16
 * @FilePath: \koa2-generator\routes\store.js
 * @LastEditTime: 2022-03-04 17:54:19
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
// 获取轮播图信息
router.get('/swipers', storeController.getSwiperInfo)
// 添加轮播图
router.post('/swipers', storeController.createSwiper)
// 删除轮播图
router.delete('/swipers/:id', storeController.deleteSwiperById)

module.exports = router
