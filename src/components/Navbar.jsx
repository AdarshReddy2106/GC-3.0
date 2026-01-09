import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <span>GC 2026</span>
      </div>
      <div className="nav-divider"></div>
      <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
        <span>Home</span>
      </Link>
      <Link to="/schedule" className={`nav-link ${location.pathname === '/schedule' ? 'active' : ''}`}>
        <span>Schedule</span>
      </Link>
      <Link to="/leaderboard" className={`nav-link ${location.pathname === '/leaderboard' ? 'active' : ''}`}>
        <span>Leaderboard</span>
      </Link>
      <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
        <span>Contact</span>
      </Link>
    </nav>
  );
};

export default Navbar;
