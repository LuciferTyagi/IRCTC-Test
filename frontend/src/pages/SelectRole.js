import React from 'react';
import { useNavigate } from 'react-router-dom';
import train from '../asset/train.jpg'

const SelectRole = () => {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    navigate('/login', { state: { role } });
  };

  return (
    <div className="relative overflow-hidden h-screen bg-gray-100">
      <div className="absolute inset-0">
        <img
          src={train} 
          alt="Train Background"
          className="w-full h-full object-cover filter blur-md"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative flex justify-center items-center h-full z-10">
        <div className="text-center bg-white p-8 rounded-md shadow-lg">
          <h1 className="text-4xl font-bold mb-8">Select Your Role</h1>
          <div className="space-x-4">
            <button
              onClick={() => handleSelect('user')}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              User
            </button>
            <button
              onClick={() => handleSelect('admin')}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectRole;
