import React from 'react';
import { useNavigate } from 'react-router-dom';
import GiphySearch from './GiphySearch';
import './Dashboard.css';

function Dashboard({ user, onSignOut }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    onSignOut();
    navigate('/');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="user-info">
          {user?.picture && (
            <img 
              src={user.picture} 
              alt="Profile" 
              className="profile-picture"
            />
          )}
          <div className="user-details">
            <h1>Welcome, {user?.name}!</h1>
            <p>Email: {user?.email}</p>
          </div>
        </div>
        <button onClick={handleSignOut} className="sign-out-button">
          Sign Out
        </button>
      </div>
      
      <div className="dashboard-content">
        <h2>Search and Share GIFs</h2>
        <GiphySearch />
      </div>
    </div>
  );
}

export default Dashboard; 