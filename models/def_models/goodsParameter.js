/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-22 10:48:46
 * @FilePath: \VScode\learn-koa2\koa2-generator\models\goodsParameter.js
 * @LastEditTime: 2022-01-18 11:29:02
 * @LastEditors: RayseaLee
 */
// // const { Sequelize, DataTypes } = require('sequelize');
// // const Goods = require('./goods')(Sequelize, DataTypes)
// // const Parameter = require('./parameter')(Sequelize, DataTypes)
// const model = []
module.exports = function(sequelize, DataTypes) {
  const GoodsParameter = sequelize.define('GoodsParameter', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    good_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    parameter_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  }, {
    tableName: 'goods_parameters',
  })
  return GoodsParameter
}