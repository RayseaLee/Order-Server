/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-13 10:01:14
 * @FilePath: \koa2-generator\models\def_models\role.js
 * @LastEditTime: 2021-12-22 11:35:16
 * @LastEditors: RayseaLee
 */
module.exports = function(sequelize, DataTypes) {
  const Role = sequelize.define('Role', {
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
    description: {
      type: DataTypes.TEXT
    },
    menu_list: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'roles'
    // associate(models) {
    //   Role.hasMany(models.User, {
    //     as: 'user',
    //     foreignKey: 'role_id',
    //     targetKey: 'id',
    //     constraints: false
    //   })
    // }
  })
  return Role
}