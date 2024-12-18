// src/components/LogoutButton.jsx
import React from 'react';
import Button from './Button';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
