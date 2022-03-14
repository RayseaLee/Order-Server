/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-03-08 11:48:54
 * @FilePath: \koa2-generator\models\def_models\orderGoods.js
 * @LastEditTime: 2022-03-08 12:00:38
 * @LastEditors: RayseaLee
 */
module.exports = function(sequelize, DataTypes) {
  const orderGoods = sequelize.define('orderGoods', {
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
    goods_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    // 菜品数量
    goods_number: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
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
    tableName: 'orders_goods'
  })
  return orderGoods
}