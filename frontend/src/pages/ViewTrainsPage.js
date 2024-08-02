import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import BackToAdminPage from './BackToAdminPage';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const ViewTrainsPage = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchTrains = async () => {
      console.log('Fetching trains...');
      try {
        const response = await axios.get('/trains/view');
        console.log('Response data:', response.data);
        setTrains(response.data);
      } catch (error) {
        console.error('Error fetching trains:', error);
      }
    };
  
    fetchTrains();
  }, []);

  const handleDelete = async (trainId) => {
    try {
      await axios.delete(`/trains/${trainId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTrains(trains.filter(train => train._id !== trainId));

    
      toast.success('Train deleted successfully!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error deleting train:', error);
      toast.error('Train is deleted', {
       
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">All Trains</h1>
      <BackToAdminPage />
      <ul className="space-y-6">
        {trains.map((train) => (
          <li key={train._id} className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{train.train_name}</h2>
              <p className="text-gray-700 mb-2"><strong>Seats Available:</strong> {train.available_seats}</p>
              <p className="text-gray-700 mb-2"><strong>Departure Time:</strong> {train.arrival_time_at_source}</p>
              <p className="text-gray-700 mb-2"><strong>Arrival Time:</strong> {train.arrival_time_at_destination}</p>
              <p className="text-gray-700 mb-2"><strong>Origin:</strong> {train.source}</p>
              <p className="text-gray-700"><strong>Destination:</strong> {train.destination}</p>
              <button
                onClick={() => handleDelete(train._id)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Delete Train
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer /> {/* Add ToastContainer to display toast notifications */}
    </div>
  );
};

export default ViewTrainsPage;
