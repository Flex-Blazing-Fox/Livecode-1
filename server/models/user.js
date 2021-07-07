'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    saldo:DataTypes.INTEGER,
  }, {
    sequelize,
    hooks:{
      beforeCreate:user=>{
        user.saldo = 5000000
      },
      beforeCreate:user=>{
        const salt = bcrypt.genSaltSync(11);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash
      }
    },
    modelName: 'User',
  });
  return User;
};