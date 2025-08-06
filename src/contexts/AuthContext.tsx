import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import fetchWithAuth from '@/lib/api';
import { User, UserResponseWithToken } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (token: string, password: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('ai-interview-user');
    const accessToken = localStorage.getItem('access_token');

    if (savedUser && accessToken) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('ai-interview-user');
        localStorage.removeItem('access_token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    const { data, error } = await fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (data) {
      const authData = data as UserResponseWithToken;
      const authenticatedUser: User = {
        id: authData.id,
        candidate_id: authData.candidate_id,
        name: authData.name,
        email: authData.email,
        created_at: authData.created_at,
      };
      setUser(authenticatedUser);
      localStorage.setItem('ai-interview-user', JSON.stringify(authenticatedUser));
      localStorage.setItem('access_token', authData.tokens.access_token);
      setIsLoading(false);
      return { success: true };
    } else {
      setIsLoading(false);
      return { success: false, error: error || 'Login failed' };
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    const { data, error } = await fetchWithAuth('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });

    if (data) {
      const authData = data as UserResponseWithToken;
      const newUser: User = {
        id: authData.id,
        candidate_id: authData.candidate_id,
        name: authData.name,
        email: authData.email,
        created_at: authData.created_at,
      };
      setUser(newUser);
      localStorage.setItem('ai-interview-user', JSON.stringify(newUser));
      localStorage.setItem('access_token', authData.tokens.access_token);
      setIsLoading(false);
      return { success: true };
    } else {
      setIsLoading(false);
      return { success: false, error: error || 'Signup failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ai-interview-user');
    localStorage.removeItem('access_token');
    // Invalidate refresh token on backend if an endpoint exists
    // fetchWithAuth('/auth/logout', { method: 'POST' });
  };

  const forgotPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    const { data, error } = await fetchWithAuth('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    setIsLoading(false);
    if (data) {
      return { success: true };
    } else {
      return { success: false, error: error || 'Failed to send reset email' };
    }
  };

  const resetPassword = async (token: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    const { data, error } = await fetchWithAuth('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
    setIsLoading(false);
    if (data) {
      return { success: true };
    } else {
      return { success: false, error: error || 'Failed to reset password' };
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    forgotPassword,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
