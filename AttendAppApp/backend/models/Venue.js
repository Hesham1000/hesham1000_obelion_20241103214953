const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Venue extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      photos: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      amenities: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      pricing: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      reviews: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    }, {
      sequelize,
      modelName: 'Venue',
      tableName: 'venues',
      timestamps: false,
    });
  }
}

Venue.init(sequelize);

module.exports = Venue;