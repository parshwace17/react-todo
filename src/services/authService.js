// src/services/authService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/auth'; // Replace with your backend URL

export const login = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
  return response.data; // Assuming the backend returns { token: 'JWT_TOKEN' }
};

export const isAuthenticated = () => !!localStorage.getItem('token');

export const logout = () => localStorage.removeItem('token');
