const Event = require('../models/Event');

class EventController {
  static async createEvent(req, res) {
    try {
      const { name, date, venue, catering, suppliers } = req.body;
      const newEvent = await Event.create({ name, date, venue, catering, suppliers });
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create event' });
    }
  }

  static async getEvent(req, res) {
    try {
      const eventId = req.params.id;
      const event = await Event.findByPk(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve event' });
    }
  }

  static async updateEvent(req, res) {
    try {
      const eventId = req.params.id;
      const { name, date, venue, catering, suppliers } = req.body;
      const [updated] = await Event.update({ name, date, venue, catering, suppliers }, { where: { id: eventId } });
      if (!updated) {
        return res.status(404).json({ error: 'Event not found' });
      }
      const updatedEvent = await Event.findByPk(eventId);
      res.status(200).json(updatedEvent);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update event' });
    }
  }

  static async deleteEvent(req, res) {
    try {
      const eventId = req.params.id;
      const deleted = await Event.destroy({ where: { id: eventId } });
      if (!deleted) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete event' });
    }
  }

  static async listEvents(req, res) {
    try {
      const events = await Event.findAll();
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve events' });
    }
  }
}

module.exports = EventController;
