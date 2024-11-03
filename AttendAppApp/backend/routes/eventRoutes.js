const express = require('express');
const EventController = require('../controllers/eventController');

const router = express.Router();

router.post('/events', EventController.createEvent);
router.get('/events/:id', EventController.getEvent);
router.put('/events/:id', EventController.updateEvent);
router.delete('/events/:id', EventController.deleteEvent);
router.get('/events', EventController.listEvents);

module.exports = router;
