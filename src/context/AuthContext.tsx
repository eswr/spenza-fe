import React, { createContext, useState, ReactNode } from 'react';
import { AuthContextType, Credentials, User } from './types';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }): React.ReactElement => {
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const login = async (credentials: Credentials):Promise<void> => {
    debugger
    // localStorage.setItem(storageKey, theme);
    // setUser(userData);
  };

  const signup = async (credentials: Credentials): Promise<void> => {
    debugger
    // setUser(userData);
  };
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setAuthError(null);
  };

  return (
    <AuthContext.Provider value={{ user, authError, setUser, setAuthError, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};