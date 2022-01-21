/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-15 14:15:23
 * @FilePath: \koa2-generator\Dao\Dao.js
 * @LastEditTime: 2021-12-20 11:18:01
 * @LastEditors: RayseaLee
 */
module.exports.deleteById = async (model, id, callback) => {
  if(id == null) return callback('参数错误')
  const res = await model.destroy({
    where: {
      id
    }
  })
  res == null ? callback('id不存在') : callback(null, null)
}