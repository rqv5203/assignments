import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard({ user, onSignOut }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    onSignOut();
    navigate('/');
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.name}!</h1>
      <div className="user-info">
        {user?.picture && (
          <img 
            src={user.picture} 
            alt="Profile" 
            className="profile-picture"
          />
        )}
        <div className="user-details">
          <p>Email: {user?.email}</p>
          <p>Full Name: {user?.name}</p>
        </div>
      </div>
      <button onClick={handleSignOut} className="sign-out-button">
        Sign Out
      </button>
    </div>
  );
}

export default Dashboard; 