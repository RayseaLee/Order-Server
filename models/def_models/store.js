/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-22 09:34:05
 * @FilePath: \koa2-generator\models\def_models\store.js
 * @LastEditTime: 2021-12-23 11:34:34
 * @LastEditors: RayseaLee
 */
module.exports = function(sequelize, DataTypes) {
  const Store = sequelize.define('Store', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    province: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    county: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    notice: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'stores'
  })
  return Store
}