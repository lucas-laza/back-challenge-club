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
                return res.status(400).json({ message: 'Name and last name are required for user' });
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
}

module.exports = new EventController();
