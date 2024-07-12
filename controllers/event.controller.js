const BaseController = require('./base.controller');
const Event = require('../models/event.model');

class EventController extends BaseController {
  constructor() {
    super(Event);
  }

  async addUserToEvent(req, res) {
    try {
      const { eventId, user } = req.body;

      // Validation des champs utilisateur
      if (!user.name || !user.last_name) {
        return res
          .status(400)
          .json({ message: 'Name and last name are required for user' });
      }

      // Vérifier si l'événement existe
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      console.log(eventId, user.name, user.last_name, event.users);

      // Ajouter l'utilisateur à la liste des utilisateurs de l'événement
      event.users.push(user);
      await event.save();

      res.status(200).json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // ça marche pas
  async getFeed(req, res) {
    try {
      const { isTournament, isOver } = req.query;
      const limit = isOver ? 10 : 20;
      const query = { is_tournament: isTournament };
      console.log(isTournament);
      if (isOver === 'true') {
        const nowUtc = new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        ).toISOString();
        query.date = { $lte: nowUtc };
      } else {
        query.date = {
          $gt: new Date(
            Date.now() - new Date().getTimezoneOffset() * 60000
          ).toISOString(),
        };
      }
      const events = await Event.find({ is_tournament: isTournament })
        .sort({ date: -1 })
        .limit(limit);

      // Validation des champs utilisateur
      if (!user.name || !user.last_name) {
        return res
          .status(400)
          .json({ message: 'Name and last name are required for user' });
      }

      // Vérifier si l'événement existe
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      // Ajouter l'utilisateur à la liste des utilisateurs de l'événement
      event.users.push(user);
      await event.save();

      res.status(200).json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getFeed(req, res) {
    try {
      const { isTournament, isOver } = req.query;
      const limit = isOver === 'true' ? 10 : 20;
      const query = {};

      if (isTournament !== undefined) {
        query.is_tournament = isTournament === 'true';
      }

      const nowUtc = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      ).toISOString();

      if (isOver === 'true') {
        query.date = { $lte: nowUtc };
      } else {
        query.date = { $gt: nowUtc };
      }

      const events = await Event.find(query).sort({ date: -1 }).limit(limit);
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new EventController();
