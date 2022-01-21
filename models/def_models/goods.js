/*
 * @Description: 商品Model
 * @Author: RayseaLee
 * @Date: 2021-12-22 09:53:51
 * @FilePath: \VScode\learn-koa2\koa2-generator\models\def_models\goods.js
 * @LastEditTime: 2022-01-18 11:29:49
 * @LastEditors: RayseaLee
 */
module.exports = function(sequelize, DataTypes) {
  const Goods = sequelize.define('Goods', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // 原价
    original_price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    // 折扣优惠价
    discount_amount: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0
    },
    // 实际价格
    real_price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    // 原料
    raw_materials: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // 介绍
    introduction: {
      type: DataTypes.STRING,
    },
    // 状态
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'goods',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['name']
      }
    ],
    associate(models) {
      Goods.hasMany(models.GoodsPic, {
        foreignKey: 'goods_id',
        as: 'goodsPics',
        sourceKey: 'id',
        constraints: false
      })
      Goods.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category',
        targetKey: 'id',
        constraints: false
      }) 
      Goods.belongsToMany(models.Parameter, {
        through: models.GoodsParameter,
      })
    }
  })
  return Goods
}