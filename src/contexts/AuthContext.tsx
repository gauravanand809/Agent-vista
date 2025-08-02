import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, authenticateUser, createUser } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
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
    // Check for saved user in localStorage on app start
    const savedUser = localStorage.getItem('ai-interview-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('ai-interview-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const authenticatedUser = authenticateUser(email, password);
    
    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem('ai-interview-user', JSON.stringify(authenticatedUser));
      setIsLoading(false);
      return { success: true };
    } else {
      setIsLoading(false);
      return { success: false, error: 'Invalid email or password' };
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = authenticateUser(email, '');
    if (existingUser) {
      setIsLoading(false);
      return { success: false, error: 'User with this email already exists' };
    }
    
    try {
      const newUser = createUser(name, email, password);
      setUser(newUser);
      localStorage.setItem('ai-interview-user', JSON.stringify(newUser));
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'Failed to create account' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ai-interview-user');
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};