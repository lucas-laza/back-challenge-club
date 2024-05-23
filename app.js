const express = require('express');
const { connect } = require('./models/connection');
const cors = require('cors');

const userController = require('./controllers/user.controller');
const eventController = require('./controllers/event.controller');
const newsController = require('./controllers/news.controller');
const contactController = require('./controllers/contact.controller');

// Connect to the database
connect();

const app = express();

app.options('*', cors());

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.get('/', (req, res) => {
    res.send('Bienvenue dans mon application Express avec MongoDB !');
});

// Create a router instance
const router = express.Router();

// User routes
router.post('/users', userController.create);
router.get('/users', userController.getAll);
router.get('/users/:id', userController.getById);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

// Event routes
router.post('/events', eventController.create);
router.get('/events', eventController.getAll);
router.get('/events/:id', eventController.getById);
router.put('/events/:id', eventController.update);
router.delete('/events/:id', eventController.delete);

// News routes
router.post('/news', newsController.create);
router.get('/news', newsController.getAll);
router.get('/news/:id', newsController.getById);
router.put('/news/:id', newsController.update);
router.delete('/news/:id', newsController.delete);

// Contact routes
router.post('/contacts', contactController.create);
router.get('/contacts', contactController.getAll);
router.get('/contacts/:id', contactController.getById);
router.put('/contacts/:id', contactController.update);
router.delete('/contacts/:id', contactController.delete);

app.use('/', router);

app.listen(3030, () => {
    console.log('Mon application Express avec MongoDB est démarrée sur le port 3030 !');
});
