const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  last_name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  is_admin: { type: Boolean, default: false },
  elo: { type: Number, required: true },
  license_number: { type: String, required: false }
});

module.exports = mongoose.model('User', userSchema);
