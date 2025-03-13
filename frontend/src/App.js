import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Homepage/Homepage';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import UserDashboard from './components/UserDashboard/UserDashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import Footer from './components/Footer/Footer';
import AboutUs from './components/AboutUs/AboutUs';
import ContactUs from './components/ContactUs/ContactUs';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
  };

  return (
    <>
    <Router>
      <Navbar isLoggedIn={isLoggedIn} userRole={userRole} handleLogout={handleLogout} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route
            path="/dashboard"
            element={isLoggedIn && userRole === 'user' ? <UserDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin-dashboard"
            element={isLoggedIn && userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
     <Footer></Footer>
    </Router>
    </>
  );
}

export default App;