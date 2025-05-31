import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <Link 
        to="/dashboard" 
        className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
      >
        Dashboard
      </Link>
      <Link 
        to="/create" 
        className={`nav-link ${location.pathname === '/create' ? 'active' : ''}`}
      >
        Create
      </Link>
    </nav>
  );
};

export default Navigation; 