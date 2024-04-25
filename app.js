const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const actualiteController = require('./controllers/actualite.controller');
const {connect} = require("./models/connection");
const cors = require('cors');

connect();

// connectDB();

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


app.post('/api/actualites', actualiteController.create);
app.get('/api/actualites', actualiteController.findAll);
app.get('/api/actualites/:id', actualiteController.findOne);
app.put('/api/actualites/:id', actualiteController.update);
app.delete('/api/actualites/:id', actualiteController.delete);

// app.post('/ajouter-utilisateur', (req, res) => {
//   const utilisateur = req.body;
//   client.connect(err => {
//     const collection = client.db("<dbname>").collection("utilisateurs");
//     collection.insertOne(utilisateur, (err, result) => {
//       if (err) {
//         res.status(500).send({ message: 'Une erreur est survenue lors de l\'ajout de l\'utilisateur' });
//       } else {
//         res.send({ message: 'Utilisateur ajouté avec succès', result });
//       }
//       client.close();
//     });
//   });
// });

app.listen(3030, () => {
  console.log('Mon application Express avec MongoDB est démarrée sur le port 3030 !');
});