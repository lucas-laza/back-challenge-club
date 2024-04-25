const mongoose = require('mongoose');

const actualiteSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  texte: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

module.exports = mongoose.model('Actualite', actualiteSchema);