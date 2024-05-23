const BaseController = require('./base.controller');
const Contact = require('../models/contact.model');

class ContactController extends BaseController {
    constructor() {
        super(Contact);
    }
}

module.exports = new ContactController();
