const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    train_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Train', required: true },
    no_of_seats: { type: Number, required: true },
    seat_numbers: [Number],
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
