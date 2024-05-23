const BaseController = require('./base.controller');
const News = require('../models/news.model');

class NewsController extends BaseController {
    constructor() {
        super(News);
    }
}

module.exports = new NewsController();
