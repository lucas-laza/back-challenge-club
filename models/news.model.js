const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    title: { type: String, required: true },
    texte: { type: String, required: true },
    imageUrl: { type: String },
    event: { type: Schema.Types.ObjectId, ref: 'Event' }
});

module.exports = mongoose.model('News', NewsSchema);