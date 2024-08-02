import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackToAdminPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/admin-home');
  };

  return (
    <button
      onClick={handleBack}
      className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    >
      Back to Admin Page
    </button>
  );
};

export default BackToAdminPage;
