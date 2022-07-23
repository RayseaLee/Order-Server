/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-04-12 17:10:49
 * @FilePath: \koa2-generator\models\def_models\table.js
 * @LastEditTime: 2022-04-15 11:38:51
 * @LastEditors: RayseaLee
 */
module.exports = function(sequelize, DataTypes) {
  const Table = sequelize.define('Table', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    // 桌台名称
    name: {
      type:DataTypes .STRING,
      allowNull: false
    },
    // 桌台容量
    contain: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    // 桌台是否占用
    occupy: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // 菜品是否上齐
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['name']
      }
    ],
    tableName: 'tables',
    associate(models) {
      Table.hasMany(models.Order, {
        as: 'orders',
        foreignKey: 'table_id',
        sourceKey: 'id'
      })
    }
  })
  return Table
}