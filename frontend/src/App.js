import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import SelectRole from './pages/SelectRole';
import UserHomePage from './pages/UserHomepage';
import BookingPage from './pages/BookingPage';
import AddTrainPage from './pages/AddTrainPage';

import ViewBookingsPage from './pages/ViewBookingsPage';
import AdminHomePage from './pages/AdminHomePage';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import ViewTrainsPage from './pages/ViewTrainsPage';
import { ToastContainer } from 'react-toastify';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="min-h-screen flex flex-col">
      {isLoggedIn && <Profile />}
      {isLoggedIn && <Logout />}
      <ToastContainer/>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/user-home" /> : <SelectRole />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/user-home" /> : <Login />} />
        <Route path="/signup" element={isLoggedIn ? <Navigate to="/user-home" /> : <Signup />} />
        <Route path="/user-home" element={<ProtectedRoute><UserHomePage /></ProtectedRoute>} />
        <Route path="/admin-home" element={<ProtectedRoute adminOnly><AdminHomePage /></ProtectedRoute>} />
        <Route path="/booking" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
        <Route path="/create-train" element={<ProtectedRoute adminOnly><AddTrainPage /></ProtectedRoute>} />
        <Route path="/view-trains" element={<ViewTrainsPage />} />
        <Route path="/bookings" element={<ProtectedRoute adminOnly><ViewBookingsPage /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
