/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-14 16:04:28
 * @FilePath: \koa2-generator\modules\ctxbody.js
 * @LastEditTime: 2021-12-14 16:21:35
 * @LastEditors: RayseaLee
 */
// 添加统一的返回结果方法
module.exports = async function(ctx, next) {
  ctx.send = function(data, status, message) {
    ctx.body = {
      data,
      'meta': {
        'msg': message,
        status
      },
    }
  }
  await next()
}