const express = require('express');
const { bookSeat, getBookingDetails, getAllBookings, deleteBooking } = require('../Controllers/BookingContoller');
const { authMiddleware, adminMiddleware } = require('../Middlewares/authMiddleware');
const router = express.Router();

router.get('/allbooking', getAllBookings);
router.post('/:train_id/book',authMiddleware, bookSeat);

router.get('/:booking_id', getBookingDetails);
router.delete('/:booking_id',  deleteBooking);
module.exports = router;
