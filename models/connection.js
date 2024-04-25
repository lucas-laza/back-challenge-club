const mongoose = require('mongoose');

exports.connect = async () => {
    const bdd = await mongoose.connect('mongodb://127.0.0.1:27017/challenge-club');
}
