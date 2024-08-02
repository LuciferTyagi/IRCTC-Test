
import React from 'react';
import { useSelector } from 'react-redux';


const Profile = () => {
  const username = useSelector((state) => state.auth.username);

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 shadow-md rounded-md">
      {username ? (
        <>
          <p className="text-lg font-semibold text-gray-700">Welcome, {username}</p>
          
        </>
      ) : (
        <p className="text-red-500">Please log in</p>
      )}
    </div>
  );
};

export default Profile;
