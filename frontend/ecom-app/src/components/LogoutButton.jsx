import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // adjust the path if needed

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/logout', {}, { withCredentials: true });
      setUser(null); // Clear auth context
      navigate('/'); // Redirect to login page
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>
      🚪 Logout
    </button>
  );
};

export default LogoutButton;
// This LogoutButton component handles user logout by calling the logout API endpoint.
// It clears the user from the auth context and redirects to the login page.