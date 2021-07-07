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
    saldo: DataTypes.INTEGER
  },{
    sequelize,
    hooks: {
      beforeCreate: (User) =>{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(User.password, salt);
        User.password = hash
      }
    },
    modelName: 'User',
  });
  return User;
};