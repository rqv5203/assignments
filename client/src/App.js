import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check URL parameters for authentication response
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      const userData = JSON.parse(decodeURIComponent(params.get('user')));
      setUser(userData);
    }
  }, []);

  async function googleAuth() {
    const response = await fetch('http://localhost:3000/request', {
      method: 'post'
    });
    const data = await response.json();
    window.location.href = data.url;
  }

  async function linkedinAuth() {
    const response = await fetch('http://localhost:3000/auth/linkedin/request', {
      method: 'post'
    });
    const data = await response.json();
    window.location.href = data.url;
  }

  const handleSignOut = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <div className="auth-container">
                <h1>Sign in with Social Media</h1>
                <div className="auth-buttons">
                  <button type="button" onClick={googleAuth}>
                    Sign in with Google
                  </button>
                  <button type="button" onClick={linkedinAuth}>
                    Sign in with LinkedIn
                  </button>
                </div>
              </div>
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard user={user} onSignOut={handleSignOut} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
