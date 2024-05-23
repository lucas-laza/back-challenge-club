const BaseController = require('./base.controller');
const Event = require('../models/event.model');

class EventController extends BaseController {
    constructor() {
        super(Event);
    }
}

module.exports = new EventController();
