/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-03-08 11:48:54
 * @FilePath: \koa2-generator\models\def_models\orderGoods.js
 * @LastEditTime: 2022-04-12 11:06:41
 * @LastEditors: RayseaLee
 */
module.exports = function(sequelize, DataTypes) {
  const OrderGoods = sequelize.define('OrderGoods', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    // 订单id
    order_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    // 菜品id
    good_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    // 菜品数量
    number: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    // 菜品参数
    params: {
      type: DataTypes.STRING
    },
    // 菜品单价
    unit_price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    // 菜品总价
    total_price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  }, {
    tableName: 'order_goods'
  })
  return OrderGoods
}