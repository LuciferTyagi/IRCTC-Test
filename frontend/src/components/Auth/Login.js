import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from '../../axiosConfig'; 
import { login } from '../../slice/authSlice'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); 
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
     
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }

        if (location.state && location.state.role) {
            setRole(location.state.role);
        }
    }, [location.state]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log("Password being sent to the server:", password);
            const response = await axios.post('/auth/login', { username, password, role });
            const token = response.data.access_token;

           
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const userRole = decodedToken.role;

          
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);

          
            dispatch(login({ token, username }));

            setIsLoggedIn(true);

       
            if (userRole === 'admin') {
                navigate('/admin-home');
            } else {
                navigate('/user-home');
            }
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            setError('Login failed. Please check your credentials.');
        }
    };

    const navigateToSignup = () => {
        navigate('/signup');
    };

    const navigateToSelectRole = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl mb-4 font-bold">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <div className="flex items-center">
                        <input
                            id="roleUser"
                            type="radio"
                            name="role"
                            value="user"
                            checked={role === 'user'}
                            onChange={() => setRole('user')}
                            className="mr-2"
                            disabled
                        />
                        <label htmlFor="roleUser" className="mr-4">User</label>
                        <input
                            id="roleAdmin"
                            type="radio"
                            name="role"
                            value="admin"
                            checked={role === 'admin'}
                            onChange={() => setRole('admin')}
                            className="mr-2"
                            disabled
                        />
                        <label htmlFor="roleAdmin">Admin</label>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Login
                </button>
                {!isLoggedIn && (
                    <button
                        type="button"
                        onClick={navigateToSelectRole}
                        className="w-full mt-4 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                    >
                        Back to Select Role
                    </button>
                )}
                <button
                    type="button"
                    onClick={navigateToSignup}
                    className="w-full mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600"
                >
                    Don't have an account? Sign up
                </button>
            </form>
        </div>
    );
};

export default Login;
