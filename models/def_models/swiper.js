/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-22 09:14:33
 * @FilePath: \VScode\learn-koa2\koa2-generator\models\def_models\swiper.js
 * @LastEditTime: 2022-01-21 15:21:45
 * @LastEditors: RayseaLee
 */
module.exports = function(sequelize, DataTypes) {
  const Swiper = sequelize.define('Swiper', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    pic_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'swipers',
    timestamps: true
  })
  return Swiper
}