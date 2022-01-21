/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-29 13:47:59
 * @FilePath: \VScode\learn-koa2\koa2-generator\models\def_models\category.js
 * @LastEditTime: 2021-12-30 16:34:08
 * @LastEditors: RayseaLee
 */
module.exports = function (sequelize, DataTypes) {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'categorys',
    associate(models) {
      Category.hasMany(models.Goods, {
        foreignKey: 'category_id',
        as: 'goods',
        sourceKey: 'id',
        constraints: false
      })
    }
  })
  return Category
}