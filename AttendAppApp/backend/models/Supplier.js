const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');

class Supplier extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          const salt = bcrypt.genSaltSync(10);
          this.setDataValue('password', bcrypt.hashSync(value, salt));
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }, {
      sequelize,
      modelName: 'suppliers',
      freezeTableName: true,
      timestamps: false,
    });
  }

  static async authenticate(email, password) {
    const supplier = await Supplier.findOne({ where: { email } });
    if (!supplier) {
      throw new Error('User not found');
    }
    const isPasswordValid = bcrypt.compareSync(password, supplier.password);
    if (!isPasswordValid) {
      throw new Error('Incorrect password');
    }
    return supplier;
  }
}

module.exports = Supplier;