import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import BackToAdminPage from './BackToAdminPage';

const ViewBookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/bookings/allbooking', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setBookings(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (bookingId) => {
    try {
      await axios.delete(`/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBookings(bookings.filter(booking => booking.booking_id !== bookingId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Bookings</h1>
      <BackToAdminPage/>
      {bookings.length === 0 ? (
        <p className="text-gray-600">No bookings available</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking.booking_id} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Booking ID: {booking.booking_id}</h2>
                <div className="text-gray-600 mb-4">
                  <p><span className="font-medium">Train Name:</span> {booking.train_name}</p>
                  <p><span className="font-medium">User ID:</span> {booking.user_id}</p>
                  <p><span className="font-medium">Username:</span> {booking.username }</p> 
                  <p><span className="font-medium">Number of Seats:</span> {booking.no_of_seats}</p>
                  {/* <p><span className="font-medium">Seat Numbers:</span> {booking.seat_numbers.join(', ')}</p> */}
                  <p><span className="font-medium">Arrival Time at Source:</span> {booking.arrival_time_at_source}</p>
                  <p><span className="font-medium">Arrival Time at Destination:</span> {booking.arrival_time_at_destination}</p>
                  {/* <p><span className="font-medium">Booking Date and Time:</span> {new Date(booking.created_at).toLocaleString()}</p> */}
                </div>
                <button
                  onClick={() => handleDelete(booking.booking_id)}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Delete Booking
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewBookingsPage;
