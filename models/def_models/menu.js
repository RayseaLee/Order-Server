/*
 * @Description: 权限菜单Model
 * @Author: RayseaLee
 * @Date: 2021-12-13 13:55:17
 * @FilePath: \koa2-generator\models\def_models\menu.js
 * @LastEditTime: 2021-12-22 17:08:24
 * @LastEditors: RayseaLee
 */
module.exports = function(sequelize, DataTypes) {
  const Menu = sequelize.define('Menu', {
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
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'menus'
  })
  return Menu
}