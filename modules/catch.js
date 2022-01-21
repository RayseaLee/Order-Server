/*
 * @Description: controller 中的异常捕获
 * @Author: RayseaLee
 * @Date: 2021-12-17 11:19:16
 * @FilePath: \koa2-generator\modules\catch.js
 * @LastEditTime: 2021-12-17 14:19:43
 * @LastEditors: RayseaLee
 */
module.exports = async (ctx, promise) => {
  try {
    await promise
  } catch (err) {
    console.log(err)
    ctx.send(null, 500, '服务器错误')
  }
}