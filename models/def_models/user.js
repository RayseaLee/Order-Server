/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-13 09:08:30
 * @FilePath: \koa2-generator\models\def_models\user.js
 * @LastEditTime: 2021-12-17 10:42:14
 * @LastEditors: RayseaLee
 */
const bcrypt = require('bcryptjs')
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: -1
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        // 同步生产盐和散列
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(value, salt)
        this.setDataValue('password', hash)
      }
    },
    email: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['username']
      }
    ],
    timestamps: true,
    tableName: 'users',
    associate(models) {
      User.belongsTo(models.Role, {
        as: 'role',
        foreignKey: 'role_id',
        targetKey: 'id',
        constraints: false
      })
    }
  })
  return User
}
