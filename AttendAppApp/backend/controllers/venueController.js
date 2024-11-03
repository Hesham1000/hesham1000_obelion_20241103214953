const { Op } = require('sequelize');
const Venue = require('../models/Venue');

exports.getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.findAll();
    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch venues' });
  }
};

exports.getVenueById = async (req, res) => {
  const { id } = req.params;
  try {
    const venue = await Venue.findByPk(id);
    if (venue) {
      res.status(200).json(venue);
    } else {
      res.status(404).json({ error: 'Venue not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch venue' });
  }
};

exports.createVenue = async (req, res) => {
  const { name, photos, capacity, amenities, pricing, reviews } = req.body;
  try {
    const newVenue = await Venue.create({
      name,
      photos,
      capacity,
      amenities,
      pricing,
      reviews
    });
    res.status(201).json(newVenue);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create venue' });
  }
};

exports.updateVenue = async (req, res) => {
  const { id } = req.params;
  const { name, photos, capacity, amenities, pricing, reviews } = req.body;
  try {
    const venue = await Venue.findByPk(id);
    if (venue) {
      await venue.update({
        name,
        photos,
        capacity,
        amenities,
        pricing,
        reviews
      });
      res.status(200).json(venue);
    } else {
      res.status(404).json({ error: 'Venue not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update venue' });
  }
};

exports.deleteVenue = async (req, res) => {
  const { id } = req.params;
  try {
    const venue = await Venue.findByPk(id);
    if (venue) {
      await venue.destroy();
      res.status(200).json({ message: 'Venue deleted successfully' });
    } else {
      res.status(404).json({ error: 'Venue not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete venue' });
  }
};

Make sure to update your database configuration to replace any instance of 'localhost' with 'db'.