/*
 * @Description: 优惠券Model
 * @Author: RayseaLee
 * @Date: 2021-12-22 17:06:26
 * @FilePath: \koa2-generator\models\def_models\coupon.js
 * @LastEditTime: 2021-12-28 10:45:55
 * @LastEditors: RayseaLee
 */
module.exports = function(sequelize, DataTypes) {
  const Coupon = sequelize.define('Coupon', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    full: { 
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    subtract: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    } 
  }, {
    tableName: 'coupons'
  })
  return Coupon
}