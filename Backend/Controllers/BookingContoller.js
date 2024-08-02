const Booking = require('../Models/Booking');
const Train = require('../Models/Train');
const jwt = require('jsonwebtoken');

exports.bookSeat = async (req, res) => {
    const { train_id } = req.params;
    const { no_of_seats } = req.body;


    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; 
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user_id = decoded.user_id;

        const train = await Train.findById(train_id);
        if (!train) {
            return res.status(404).json({ message: "Train not found" });
        }
        if (train.available_seats < no_of_seats) {
            return res.status(400).json({ message: "Not enough seats available" });
        }
        train.available_seats -= no_of_seats;
        await train.save();

        const booking = new Booking({ user_id, train_id, no_of_seats });
        await booking.save();

        res.status(200).json({
            message: "Seat booked successfully",
            booking_id: booking._id,
            seat_numbers: Array.from({ length: no_of_seats }, (_, i) => i + 1)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBookingDetails = async (req, res) => {
    const { booking_id } = req.params;
    try {
        const booking = await Booking.findById(booking_id).populate('train_id');
        res.status(200).json({
            booking_id: booking._id,
            train_id: booking.train_id._id,
            train_name: booking.train_id.train_name,
            user_id: booking.user_id,
            no_of_seats: booking.no_of_seats,
            seat_numbers: booking.seat_numbers,
            arrival_time_at_source: booking.train_id.arrival_time_at_source,
            arrival_time_at_destination: booking.train_id.arrival_time_at_destination
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
   
        const bookings = await Booking.find()
            .populate({
                path: 'train_id',
                select: 'train_name arrival_time_at_source arrival_time_at_destination'
            })
            .populate({
                path: 'user_id',
                select: 'username'
            });

        const response = bookings.map(booking => ({
            booking_id: booking._id,
            train_id: booking.train_id ? booking.train_id._id : null,
            train_name: booking.train_id ? booking.train_id.train_name : 'Unknown',
            user_id: booking.user_id ? booking.user_id._id : null,
            username: booking.user_id ? booking.user_id.username : 'Unknown',
            no_of_seats: booking.no_of_seats,
            seat_numbers: booking.seat_numbers,
            arrival_time_at_source: booking.train_id ? booking.train_id.arrival_time_at_source : 'Unknown',
            arrival_time_at_destination: booking.train_id ? booking.train_id.arrival_time_at_destination : 'Unknown'
        }));

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteBooking = async (req, res) => {
    const { booking_id } = req.params;
    try {
        await Booking.findByIdAndDelete(booking_id);
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

