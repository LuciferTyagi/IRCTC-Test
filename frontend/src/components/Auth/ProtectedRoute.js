
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly }) => {
  const { isLoggedIn, token } = useSelector((state) => state.auth);

  if (!isLoggedIn || !token) {
    return <Navigate to="/" />;
  }

  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const userRole = decodedToken.role;

  if (adminOnly && userRole !== 'admin') {
    return <Navigate to="/user-home" />;
  }

  if (!adminOnly && userRole === 'admin') {
    return <Navigate to="/admin-home" />;
  }

  return children;
};

export default ProtectedRoute;
