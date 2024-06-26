const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    is_admin: { type: Boolean, default: false },
    elo: { type: Number, default: 0 },
    license_number: { type: String, unique: true }
});

module.exports = mongoose.model('User', UserSchema);