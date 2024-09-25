import React, { createContext, useState, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Define the type for the context value (user and functions like login, register)
interface AuthContextProps {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  error: string | null; 
}

// Define the type for the props the provider will accept (including children)
interface AuthProviderProps {
  children: ReactNode;
}

// Create the Auth Context with default values
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null); 

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post('http://192.168.0.33:5001/api/users/login', { email, password });
      console.log('Login request sent'); // Log for debugging
      const token = res.data.token;
      await AsyncStorage.setItem('token', token);
      setUser(jwtDecode(token)); // Decode JWT and store user details
      console.log('Decoded token:', jwtDecode(token)); // Log for debugging
    } catch (err) {
      console.error(err);
      setError('Invalid credentials, please try again.'); // Set an error message
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await axios.post('http://localhost:5001/api/users/register', { name, email, password });
      console.log('Response from login API:', res.data); // Debugging log
      const token = res.data.token;
      await AsyncStorage.setItem('token', token);
      setUser(jwtDecode(token));
      console.log('Decoded token:', jwtDecode(token)); // Debugging log
      setError(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
