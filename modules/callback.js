/*
 * @Description: 服务层 services 统一的回调函数
 * @Author: RayseaLee
 * @Date: 2021-12-17 13:43:56
 * @FilePath: \koa2-generator\modules\callback.js
 * @LastEditTime: 2021-12-17 14:19:33
 * @LastEditors: RayseaLee
 */
module.exports = (ctx) => {
  let status, message
  if(ctx.method === "GET") {
    status = 200
    message = '查询成功'
  }
  if(ctx.method === "POST") {
    status = 201
    message = '添加成功'
  }
  if(ctx.method === "DELETE") {
    status = 204
    message = '删除成功'
  }
  if(ctx.method === "PUT") {
    status = 200
    message = '修改成功'
  }
  return (err, data) => {
    if(err) return ctx.send(null, 400, err)
    ctx.send(data, status, message)
  }
}
