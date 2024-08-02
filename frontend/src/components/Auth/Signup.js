import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); 
  const [secretKey, setSecretKey] = useState('');
  const [message, setMessage] = useState(''); 
  const navigate = useNavigate();

  const ADMIN_API_KEY = '8265'; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let userData = { username, email, password, role };
      if (role === 'admin' && secretKey === ADMIN_API_KEY) {
        userData.secret_key = secretKey; 
      } else if (role === 'admin') {
        
        setMessage('Invalid admin API key');
        return;
      }

      await axios.post('/auth/signup', userData);
      setMessage('Account created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000); 
    } catch (error) {
      console.error('Signup failed:', error.message);
      setMessage('Signup failed: ' + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        {message && (
          <div className={`mb-4 p-2 text-white ${message.includes('successfully') ? 'bg-green-500' : 'bg-red-500'} rounded-md`}>
            {message}
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-1" htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {role === 'admin' && (
          <div className="mb-4">
            <label className="block mb-1" htmlFor="secretKey">Secret Key</label>
            <input
              type="password"
              id="secretKey"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
        )}
        <button type="submit" className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
