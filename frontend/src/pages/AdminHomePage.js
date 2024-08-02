import React from 'react';
import { Link } from 'react-router-dom';

const AdminHomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Admin Home Page</h1>
      <Link to="/create-train" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
        Add Train
      </Link>
      <Link to="/view-trains" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        View Trains
      </Link>
      <Link to="/bookings" className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
        View Bookings
      </Link>
    </div>
  );
};

export default AdminHomePage;
