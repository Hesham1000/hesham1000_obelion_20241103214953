const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('None', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

class Event extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      venue: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      catering: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      suppliers: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
      },
    }, {
      sequelize,
      modelName: 'Event',
      tableName: 'events', // specify the existing table name
      timestamps: false, // disable timestamps
    });
  }
}

Event.init(sequelize);

module.exports = Event;
