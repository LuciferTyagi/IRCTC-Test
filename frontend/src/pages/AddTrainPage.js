import React, { useState } from 'react';
import axios from '../axiosConfig';
import BackToAdminPage from './BackToAdminPage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTrainPage = () => {
  const [name, setName] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [seatCapacity, setSeatCapacity] = useState('');
  const [availableSeats, setAvailableSeats] = useState('');
  const [arrivalTimeAtSource, setArrivalTimeAtSource] = useState('00:00');
  const [arrivalTimeAtDestination, setArrivalTimeAtDestination] = useState('00:00');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/trains/create', {
        train_name: name,
        source,
        destination,
        seat_capacity: seatCapacity,
        available_seats: availableSeats,
        arrival_time_at_source: arrivalTimeAtSource,
        arrival_time_at_destination: arrivalTimeAtDestination,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('Train added successfully!');
      
  
      setName('');
      setSource('');
      setDestination('');
      setSeatCapacity('');
      setAvailableSeats('');
      setArrivalTimeAtSource('00:00');
      setArrivalTimeAtDestination('00:00');
    } catch (error) {
      console.error(error);
      toast.error('Error adding train');
    }
  };

  const handleSeatCapacityChange = (e) => {
    const value = e.target.value;
    setSeatCapacity(value);
  };

  const handleAvailableSeatsChange = (e) => {
    const value = e.target.value;
    setAvailableSeats(value);
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 p-4">
      <BackToAdminPage />
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mt-4 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Add Train</h1>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="name">Train Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="source">Source</label>
          <input
            type="text"
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="destination">Destination</label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="seatCapacity">Seat Capacity</label>
          <input
            type="number"
            id="seatCapacity"
            value={seatCapacity}
            onChange={handleSeatCapacityChange}
            className="w-full px-3 py-2 border rounded-md"
            required
            min="0"
            placeholder="0"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="availableSeats">Available Seats</label>
          <input
            type="number"
            id="availableSeats"
            value={availableSeats}
            onChange={handleAvailableSeatsChange}
            className="w-full px-3 py-2 border rounded-md"
            required
            min="0"
            placeholder="0"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="arrivalTimeAtSource">Arrival Time at Source</label>
          <input
            type="time"
            id="arrivalTimeAtSource"
            value={arrivalTimeAtSource}
            onChange={(e) => setArrivalTimeAtSource(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="arrivalTimeAtDestination">Arrival Time at Destination</label>
          <input
            type="time"
            id="arrivalTimeAtDestination"
            value={arrivalTimeAtDestination}
            onChange={(e) => setArrivalTimeAtDestination(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Add Train
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddTrainPage;
