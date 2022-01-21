/*
 * @Description: 商品图片Model
 * @Author: RayseaLee
 * @Date: 2021-12-22 10:20:50
 * @FilePath: \koa2-generator\models\def_models\goodsPic.js
 * @LastEditTime: 2021-12-22 17:08:25
 * @LastEditors: RayseaLee
 */
module.exports = function(sequelize, DataTypes) {
  const GoodsPic = sequelize.define('GoodsPic', {
    id: { 
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    goods_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    pic_url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'goods_pics',
    associate(models) {
      GoodsPic.belongsTo(models.Goods, {
        as: 'goods',
        foreignKey: 'goods_id',
        targetKey: 'id',
        constraints: false
      })
    }
  })
  return GoodsPic
}