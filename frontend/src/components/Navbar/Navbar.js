import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.css';


const Navbar = ({ isLoggedIn, userRole, handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Secure Video Platform</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about-us">About Us</Link></li>
        <li><Link to="/contact-us">Contact Us</Link></li>
        {isLoggedIn ? (
          <>
            {userRole === 'admin' ? (
              <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
            ) : (
              <li><Link to="/dashboard">Dashboard</Link></li>
            )}
            <li>
              <button onClick={handleLogoutClick} className="btn-logout">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;