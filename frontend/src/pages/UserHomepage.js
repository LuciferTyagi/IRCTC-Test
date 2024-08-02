import React from 'react';
import { Link } from 'react-router-dom';

const UserHomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to User Home Page</h1>
      <Link to="/booking" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Book Train Tickets
      </Link>
    </div>
  );
};

export default UserHomePage;
