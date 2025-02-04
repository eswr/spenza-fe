// src/services/authService.js
import api from '../api/axios';

export const signup = async (email, password, confirmPassword) => {
  try {
    const response = await api.post('/auth/signup', {
      email,
      password,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Signup failed';
  }
};
