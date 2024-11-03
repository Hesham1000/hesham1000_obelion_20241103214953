const express = require('express');
const router = express.Router();
const venueController = require('../controllers/venueController');

// Get all venues
router.get('/venues', venueController.getAllVenues);

// Get a single venue by ID
router.get('/venues/:id', venueController.getVenueById);

// Create a new venue
router.post('/venues', venueController.createVenue);

// Update an existing venue
router.put('/venues/:id', venueController.updateVenue);

// Delete a venue
router.delete('/venues/:id', venueController.deleteVenue);

module.exports = router;

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'db',
  dialect: 'mysql'
});

const Venue = sequelize.define('Venue', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photos: {
    type: DataTypes.JSON,
    allowNull: false
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  amenities: {
    type: DataTypes.JSON,
    allowNull: false
  },
  pricing: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reviews: {
    type: DataTypes.JSON
  }
}, {
  tableName: 'venues',
  timestamps: false
});

module.exports = Venue;