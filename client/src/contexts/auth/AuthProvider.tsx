// src/contexts/auth/AuthProvider.tsx
import { FC, PropsWithChildren, useState } from 'react';
import { AuthContext } from './AuthContext';
import { AuthState, LoginCredentials } from './types';
import { apiClient } from '../../services/api/client';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  token: null
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      setAuthState({
        user: response.data.user,
        isAuthenticated: true,
        token: response.data.token
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setAuthState(initialState);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        authState,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};