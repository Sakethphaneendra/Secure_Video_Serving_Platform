import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' }); // For success/error messages
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            setMessage({ text: response.data.message, type: 'success' });

            // Call the onLogin function with the user's role
            onLogin(response.data.role);

            // Redirect based on role
            if (response.data.role === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/user-dashboard'); // Changed from '/dashboard' to '/user-dashboard'
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setMessage({ text: error.response?.data?.message || 'Login failed. Please check your credentials.', type: 'error' });
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>

            {/* Display success/error message */}
            {message.text && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            {/* Email Input */}
            <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password Input */}
            <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {/* Login Button */}
            <button onClick={handleLogin}>Login</button>

            {/* Register Link */}
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    );
};

export default Login;