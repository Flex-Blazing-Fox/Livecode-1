'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Whislist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Whislist.belongsTo(models.User,{foreignKey:'userId'})
      // define association here
    }
  };
  Whislist.init({
    name: DataTypes.STRING,
    image_url: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Whislist',
  });
  return Whislist;
};