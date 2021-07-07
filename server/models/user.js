'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Wishlists, { foreignKey: 'UserId' })
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    saldo: {
      type: DataTypes.INTEGER,
      defaultValue: 5000000
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, options) => {
        const salt = bcrypt.genSaltSync(10)
        user.password = bcrypt.hashSync(user.password, salt)
      }
    },
    modelName: 'User',
  });
  return User;
};