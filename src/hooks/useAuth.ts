import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User } from '../types';
import { mockDatabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  signup: (email: string, password: string, name: string, role: 'photographer' | 'client') => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('honcho_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const signup = async (email: string, password: string, name: string, role: 'photographer' | 'client') => {
    setIsLoading(true);
    try {
      // Check if user already exists
      const existingUser = mockDatabase.users.find(u => u.email === email);
      if (existingUser) {
        throw new Error('User already exists');
      }

      const mockUser: User = {
        id: (mockDatabase.users.length + 1).toString(),
        email,
        name,
        role,
        createdAt: new Date()
      };
      
      // Add to mock database
      mockDatabase.users.push(mockUser);
      localStorage.setItem('honcho_user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Find user in mock database
      const foundUser = mockDatabase.users.find(u => u.email === email);
      if (!foundUser) {
        throw new Error('User not found');
      }
      
      localStorage.setItem('honcho_user', JSON.stringify(foundUser));
      setUser(foundUser);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('honcho_user');
    setUser(null);
  };

  return {
    user,
    signup,
    login,
    logout,
    isLoading
  };
};

export { AuthContext };