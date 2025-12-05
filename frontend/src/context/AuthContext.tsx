import React, { createContext, useContext, useState } from 'react';

// Define the shape of the authentication context
type AuthContextType = {
  token: string | null;
  storeToken: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

/**
 * AuthProvider manages authentication state for the application
 * It persists the token in localStorage to maintain session across page refreshes
 */
export function AuthProvider({ children }: Props) {
  // Initialize token from localStorage to maintain session after page refresh
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token') || null
  );

  // Store the token both in state and localStorage
  const storeToken = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  // Remove the token from both state and localStorage
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  // Simple boolean to check if user is authenticated
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ token, storeToken, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to access authentication context
 * Provides a type-safe way to access auth state and functions
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
