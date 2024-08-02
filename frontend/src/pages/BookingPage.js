import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const BookingPage = () => {
  const [trains, setTrains] = useState([]);
  const [sources, setSources] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await axios.get('/trains/stations');
        setSources(response.data.sources);
        setDestinations(response.data.destinations);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStations();
  }, []);

  const fetchTrains = async () => {
    try {
      const response = await axios.get('/trains/availability', {
        params: { source: source.trim(), destination: destination.trim() }
      });
      if (response.data.length === 0) {
        setMessage("No trains available between the entered stations.");
      } else {
        setTrains(response.data);
        setMessage('');
      }
    } catch (error) {
      console.error(error);
      setMessage("No trains available between the entered stations.");
    }
  };

  const handleBook = async (trainId) => {
    try {
      const user_id = localStorage.getItem('user_id');
      const no_of_seats = 1;
      const response = await axios.post(`/bookings/${trainId}/book`, { user_id, no_of_seats }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBookingId(response.data.booking_id);
      alert('Booking successful!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewBookingDetails = async () => {
    try {
      const response = await axios.get(`/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert(`Booking Details: \n Train: ${response.data.train_name} \n Seats: ${response.data.no_of_seats}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearFields = () => {
    setSource('');
    setDestination('');
    setTrains([]);
    setMessage('');
  };

  const handleGoToUserHome = () => {
    navigate('/user-home');
  };

  return (
    <div className="p-6 flex flex-col lg:flex-row gap-6">
      {/* Left Side: Available Stations */}
      <div className="lg:w-1/3 bg-gray-100 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Available Stations</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Sources</h3>
          <ul className="list-disc pl-5 space-y-1">
            {sources.map((station, index) => (
              <li key={index} className="text-gray-700">{station}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Destinations</h3>
          <ul className="list-disc pl-5 space-y-1">
            {destinations.map((station, index) => (
              <li key={index} className="text-gray-700">{station}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Side: Book a Train */}
      <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Book a Train</h1>
        <div className="mb-6 flex flex-col lg:flex-row gap-4">
          <input
            type="text"
            placeholder="Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchTrains}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Find Trains
          </button>
          <button
            onClick={handleClearFields}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
          >
            Clear Fields
          </button>
        </div>
        {message && <p className="text-red-500 mb-4">{message}</p>}
        {trains.length > 0 && (
          <ul className="space-y-4">
            {trains.map((train) => (
              <li key={train.train_id} className="p-4 border border-gray-300 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-2">{train.train_name}</h2>
                <p className="text-gray-700 mb-2">Seats Available: {train.available_seats}</p>
                <button
                  onClick={() => handleBook(train.train_id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                  Book Now
                </button>
              </li>
            ))}
          </ul>
        )}
        {bookingId && (
          <button
            onClick={handleViewBookingDetails}
            className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition"
          >
            View Booking Details
          </button>
        )}
        {/* Button to navigate to user-home */}
        <button
          onClick={handleGoToUserHome}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
        >
          Go to User Home
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
