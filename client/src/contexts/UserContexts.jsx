import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    id: null,
    name: '',
    email: '',
    role: 'user'
  });

  const [goldPrice, setGoldPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGoldPrice = async () => {
    try {
      setError(null);
      const response = await fetch('https://gold-api.com/');
      if (response.ok) {
        const html = await response.text();
        const priceMatch = html.match(/\$(\d+(?:\.\d+)?)/);
        if (priceMatch) {
          setGoldPrice(parseFloat(priceMatch[1]));
        } else {
          setGoldPrice(3389.30);
        }
      } else {
        setGoldPrice(3389.30);
      }
    } catch (error) {
      setGoldPrice(3389.30);
      setError('No se pudo obtener el precio en tiempo real');
    }
  };

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await authAPI.getMe();
        setUser({
          isLoggedIn: true,
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          role: response.data.user.role
        });
      } catch (error) {
        localStorage.removeItem('token');
        setUser({
          isLoggedIn: false,
          id: null,
          name: '',
          email: '',
          role: 'user'
        });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
    fetchGoldPrice();
    const interval = setInterval(fetchGoldPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  const register = async (userData) => {
    const response = await authAPI.register(userData);
    const { token, user: userInfo } = response.data;

    localStorage.setItem('token', token);
    setUser({
      isLoggedIn: true,
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      role: userInfo.role
    });
  };

  const login = async (credentials) => {
    const response = await authAPI.login(credentials);
    const { token, user: userInfo } = response.data;

    localStorage.setItem('token', token);
    setUser({
      isLoggedIn: true,
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      role: userInfo.role
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser({
      isLoggedIn: false,
      id: null,
      name: '',
      email: '',
      role: 'user'
    });
  };

  const value = {
    user,
    goldPrice,
    loading,
    error,
    register,
    login,
    logout,
    fetchGoldPrice
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};



