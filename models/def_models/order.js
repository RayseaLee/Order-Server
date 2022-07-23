/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-03-07 14:05:17
 * @FilePath: \koa2-generator\models\def_models\order.js
 * @LastEditTime: 2022-04-15 15:26:48
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
      type: DataTypes.STRING,
      allowNull: false
    },
    // 用户id
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    // 餐桌id
    table_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    // 订单完成时间
    finish_time: {
      type: DataTypes.DATE
    },
    // 订单状态
    status: {
      type: DataTypes.STRING
    },
    // 菜品数量
    number: {
      type: DataTypes.INTEGER.UNSIGNED
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
    },
    // 订单备注
    remark: { 
      type: DataTypes.STRING
    },
    // 用餐人数
    meals_number: {
      type: DataTypes.INTEGER.UNSIGNED
    },
    // 是否已评价
    evaluated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'orders',
    timestamps: true,
    // 下单时间
    createdAt: 'order_time',
    updatedAt: false,
    associate(models) {
      Order.belongsToMany(models.Goods, {
        as: 'goodsInfo',
        through: models.OrderGoods,
        constraints: false
      })
      Order.belongsTo(models.WechatUser, {
        as: 'wx_user',
        foreignKey: 'user_id',
        targetKey: 'id',
        constraints: false
      })
      Order.belongsTo(models.Table, {
        foreignKey: 'table_id',
        as: 'table',
        targetKey: 'id'
      })
      Order.hasOne(models.Evaluation, {
        foreignKey: 'order_id',
        as: 'evaluation',
        sourceKey: 'id',
        constraints: false
      })
    }
  })
  return Order
}