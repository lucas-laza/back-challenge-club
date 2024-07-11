const express = require('express');
const { connect } = require('./models/connection');
const cors = require('cors');

const userController = require('./controllers/user.controller');
const eventController = require('./controllers/event.controller');
const newsController = require('./controllers/news.controller');
const contactController = require('./controllers/contact.controller');
const authController = require('./controllers/auth.controller');

const auth = require('./middleware/auth');
const admin = require('./middleware/admin');
const upload = require('./config/multer');

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

// Auth routes
router.post('/auth/signin', authController.signup);
router.post('/auth/login', authController.login);

// User routes (admin sur toutes)
router.get('/users', [auth, admin], userController.getAll);
router.get('/users/:id', [auth, admin], userController.getById);
router.put('/users/:id', [auth, admin], userController.update);
router.delete('/users/:id', [auth, admin], userController.delete);
router.get('/profile', [auth], userController.getCurrent);
router.post('/profile', [auth], userController.updateProfile);

// Event routes 
router.post('/events', [auth, admin], eventController.create); // admin
router.get('/events', eventController.getAll);
router.get('/feed/events', eventController.getFeed);

router.get('/events/:id', eventController.getById);
router.put('/events/:id', [auth, admin], eventController.update); // admin
router.delete('/events/:id', [auth, admin], eventController.delete); // admin
router.post('/events/addUser', eventController.addUserToEvent);

// News routes
router.post('/news', [auth, admin, upload.single('image')], newsController.createNews); // admin
router.get('/news', newsController.getAll);
router.get('/feed/news/latest', newsController.getLatest);
router.get('/feed/news/paginate/:page', newsController.getPaginated);

router.get('/news/:id', newsController.getById);
router.put('/news/:id', [auth, admin, upload.single('image')], newsController.update); // admin
router.delete('/news/:id', [auth, admin], newsController.delete); // admin

// Contact routes
router.post('/contacts', contactController.create);
router.get('/contacts', [auth, admin], contactController.getAll); // admin
router.get('/contacts/:id', [auth, admin], contactController.getById); // admin
router.put('/contacts/:id', [auth, admin], contactController.update); // admin
router.delete('/contacts/:id', [auth, admin], contactController.delete); // admin

app.use('/', router);

app.listen(3030, () => {
    console.log('Mon application Express avec MongoDB est démarrée sur le port 3030 !');
});