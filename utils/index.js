/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-10 09:31:28
 * @FilePath: \koa2-generator\utils\index.js
 * @LastEditTime: 2021-12-20 09:50:34
 * @LastEditors: RayseaLee
 */

/**
 * ctx.body返回的参数
 * @param {String} message 提示信息
 * @param {Array || Object} data 数据
 * @param {Number} status 状态码
 */
// const returnCtxBody = ({
//   ctx,
//   data = null,
//   message = '操作成功',
//   status = 200,
// }) => {
//   ctx.body = {
//     data,
//     'meta': {
//       'msg': message,
//       status
//     },
//   }
// }

/**
 * 将列表形式的数据转换为树形
 * @param {Array[Object]} resouce 
 * @returns target
 */
function listToTree(resouce) {
  const target = []
  if(resouce == null || resouce.length == 0) {
    return target
  }
  for(item of resouce) {
    item.children = []
    if(item.level == 0) {
      target.push(item)
    }
  }
  for(obj of target) {
    for(item of resouce) {
      if(item.level == 1 && item.parent_id == obj.id) {
        obj.children.push(item)
      }
    }
  }
  return target
}

module.exports = {
  listToTree
  // returnCtxBody
}

