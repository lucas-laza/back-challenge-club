const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSubSchema = new Schema({
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  id: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  elo: { type: Number },
  license: { type: String }
}, { _id: false });

const eventSchema = new Schema({
  name: { type: String, required: true },
  is_tournament: { type: Boolean, default: false },
  date: { type: Date, required: true },
  users: [userSubSchema]
});

module.exports = mongoose.model('Event', eventSchema);
