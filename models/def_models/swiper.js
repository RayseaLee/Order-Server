/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-22 09:14:33
 * @FilePath: \koa2-generator\models\def_models\swiper.js
 * @LastEditTime: 2021-12-22 09:23:10
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
    }
  }, {
    tableName: 'swipers',
  })
  return Swiper
}