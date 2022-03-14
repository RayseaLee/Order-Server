/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-03-07 14:05:17
 * @FilePath: \koa2-generator\models\def_models\order.js
 * @LastEditTime: 2022-03-08 11:51:53
 * @LastEditors: RayseaLee
 */
module.exports = function(sequelize, DataTypes) {
  const Order = sequelize.define('Order', {
    // 订单自增主键
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    // 订单编号
    order_id: {
      type: DataTypes.STRING
    },
    // 用户id
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED
    },
    // 下单时间
    order_time: {
      type: DataTypes.DATE
    },
    // 订单完成时间
    finish_time: {
      type: DataTypes.DATE
    },
    // 订单状态
    status: {
      type: DataTypes.STRING
    },
    // 订单总金额
    total_price: {
      type: DataTypes.INTEGER.UNSIGNED
    },
    // 优惠金额
    discount_price: {
      type: DataTypes.INTEGER.UNSIGNED
    },
    // 实际交易价格
    deal_price: {
      type: DataTypes.INTEGER.UNSIGNED
    } 
  }, {
    tableName: 'orders'
  })
  return Order
}