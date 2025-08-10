import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User } from '../types';

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
      // Mock signup - in production, this would be an API call
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role,
        createdAt: new Date()
      };
      
      localStorage.setItem('honcho_user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      throw new Error('Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock authentication - in production, this would be an API call
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: email.includes('photographer') ? 'photographer' : 'client',
        createdAt: new Date()
      };
      
      localStorage.setItem('honcho_user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      throw new Error('Login failed');
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