import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [message, setMessage] = useState({ text: '', type: '' }); // For success/error messages
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post('http://localhost:5000/register', { name, email, password, role });
            setMessage({ text: 'Registration successful!', type: 'success' });
            setTimeout(() => {
                navigate('/login'); // Redirect to login after 2 seconds
            }, 2000);
        } catch (error) {
            console.error('Error registering:', error);
            setMessage({ text: 'Registration failed. Please try again.', type: 'error' });
        }
    };

    return (
        <div className="register-container">
            <h1>Register</h1>

            {/* Display success/error message */}
            {message.text && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            {/* Name Input */}
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            {/* Email Input */}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password Input */}
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {/* Role Select */}
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>

            {/* Register Button */}
            <button onClick={handleRegister}>Register</button>

            {/* Login Link */}
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
};

export default Register;