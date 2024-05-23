const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: { type: String, required: true },
    is_tournament: { type: Boolean, default: false },
    date: { type: Date, required: true },
    users: [
        {
            userId: { type: Schema.Types.ObjectId, ref: 'User' },
            elo: { type: Number }
        }
    ]
});

module.exports = mongoose.model('Event', EventSchema);
