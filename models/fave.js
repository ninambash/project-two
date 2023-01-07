'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fave extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.fave.belongsTo(models.user)
      models.fave.hasMany(models.comment)
      // define association here
    }
  }
  fave.init({
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    foodId: DataTypes.INTEGER
   
  }, {
    sequelize,
    modelName: 'fave',
  });
  return fave;
};