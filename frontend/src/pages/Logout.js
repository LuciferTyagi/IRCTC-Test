
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { performLogout } from '../slice/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(performLogout());
    toast.error('You have been logged out!');
    setTimeout(() => {
      navigate('/');
    }, 2000); 
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
