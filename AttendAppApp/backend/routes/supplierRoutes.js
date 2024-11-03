const express = require('express');
const router = express.Router();
const {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier
} = require('../controllers/supplierController');
const Supplier = require('../models/Supplier'); // Import the Supplier model

// GET /api/suppliers - Retrieve all suppliers
router.get('/api/suppliers', getSuppliers);

// GET /api/suppliers/:id - Retrieve a specific supplier by ID
router.get('/api/suppliers/:id', getSupplierById);

// POST /api/suppliers - Create a new supplier
router.post('/api/suppliers', createSupplier);

// PUT /api/suppliers/:id - Update a supplier by ID
router.put('/api/suppliers/:id', updateSupplier);

// DELETE /api/suppliers/:id - Delete a supplier by ID
router.delete('/api/suppliers/:id', deleteSupplier);

module.exports = router;

// AttendAppApp/database/models/Supplier.js
const { Model, DataTypes } = require('sequelize');

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
      modelName: 'Supplier',
      freezeTableName: true,
      timestamps: false,
    });
  }
}

module.exports = Supplier;

// AttendAppApp/config/database.js
module.exports = {
  username: 'your_username',
  password: 'your_password',
  database: 'your_database',
  host: 'db', // Replace 'localhost' with 'db'
  dialect: 'your_dialect',
};