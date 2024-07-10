const BaseController = require('./base.controller');
const News = require('../models/news.model');

class NewsController extends BaseController {
    constructor() {
        super(News);
    }

    getLatest = async (req, res) => {
        try {
            const limit = 3;
            const news = await News.find().sort({ createdAt: -1 }).limit(limit);
            res.status(200).json(news);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    getPaginated = async (req, res) => {
        try {
            const page = parseInt(req.params.page) || 1;
            const limit = 10;
            const skip = (page - 1) * limit;
            const news = await News.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
            res.status(200).json(news);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}

module.exports = new NewsController();
