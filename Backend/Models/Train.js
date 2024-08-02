const mongoose = require('mongoose');

const TrainSchema = new mongoose.Schema({
    train_name: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    seat_capacity: { type: Number, required: true },
    available_seats: { type: Number, required: true },
    arrival_time_at_source: { type: String, required: true },
    arrival_time_at_destination: { type: String, required: true }
});

module.exports = mongoose.model('Train', TrainSchema);
