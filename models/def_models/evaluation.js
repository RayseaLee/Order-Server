/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-04-15 15:08:06
 * @FilePath: \koa2-generator\models\def_models\evaluation.js
 * @LastEditTime: 2022-04-17 20:30:24
 * @LastEditors: RayseaLee
 */
module.exports = function(sequelize, DataTypes) {
  const Evaluation = sequelize.define('Evaluation', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    // 订单id
    order_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    // 用户id
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // 评价内容
    content: {
      type: DataTypes.STRING,
    },
    // 商家回复
    reply: {
      type: DataTypes.STRING
    },
    // 评分
    score: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    // 是否匿名
    anonymous: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    // 商家回复时间
    reply_time: {
      type: DataTypes.DATE
    }
  }, {
    tableName: 'evaluations',
    timestamps: true,
    // 评价时间
    createdAt: 'evaluate_time',
    // 回复时间
    updatedAt: false,
    associate(models) {
      Evaluation.belongsTo(models.Order, {
        foreignKey: 'order_id',
        as: 'order',
        targetKey: 'id',
        constraints: false
      })
      Evaluation.belongsTo(models.WechatUser, {
        as: 'wx_user',
        foreignKey: 'user_id',
        targetKey: 'id',
        constraints: false
      })
    }
  })
  return Evaluation
}