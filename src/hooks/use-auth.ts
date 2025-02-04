import { useContext, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../context/AuthContext';
import { api } from '@/lib/api';
import { Credentials, User } from '@/context/types';

interface TokenPayload {
  email: string;
  // Include other properties from your JWT payload if necessary
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { setUser, setAuthError } = context;

  const loginMutation = useMutation({
    mutationFn: async (credentials: Credentials) => {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    },
    onSuccess: (data: { token: string }) => {
      debugger
      localStorage.setItem('token', data.token);
      try {
        const decoded = jwtDecode<TokenPayload>(data.token);
        setUser({ email: decoded.email });
        setAuthError(null);
      } catch (error) {
        console.error('Invalid token:', error);
        setAuthError('Invalid token received.');
      }
    },
    onError: (error: any) => {
      debugger
      if (error.response && error.response.status === 401) {
        setAuthError('Invalid email or password.');
      } else {
        setAuthError('An unexpected error occurred. Please try again later.');
      }
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (credentials: Credentials) => {
      const response = await api.post('/auth/signup', credentials);
      return response.data;
    },
    onSuccess: () => {
      // Optionally, handle post-signup actions here
    },
    onError: (error: any) => {
      setAuthError('An error occurred during signup. Please try again.');
    },
  });

  const login = async (credentials: Credentials) => {
    await loginMutation.mutateAsync(credentials);
  };

  const signup = async (credentials: Credentials) => {
    await signupMutation.mutateAsync(credentials);
  };

  return {
    ...context,
    login,
    signup,
    isLoading: loginMutation.isPending || signupMutation.isPending,
  };
};
