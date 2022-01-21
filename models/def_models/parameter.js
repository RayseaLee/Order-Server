/*
 * @Description: 商品动态参数 Model
 * @Author: RayseaLee
 * @Date: 2021-12-22 10:40:10
 * @FilePath: \VScode\learn-koa2\koa2-generator\models\def_models\parameter.js
 * @LastEditTime: 2022-01-18 11:30:05
 * @LastEditors: RayseaLee
 */
module.exports = function(sequelize, DataTypes) {
  const Parameter = sequelize.define('Parameter', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    // 参数名
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // 参数列表
    list: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'parameters',
    associate(models) {
      Parameter.belongsToMany(models.Goods, {
        through: models.GoodsParameter,
      })
    }
  })
  return Parameter
}