// Example using React Context API
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(""); // Or initial value from localStorage

  useEffect(() => {
    const storedToken = localStorage.getItem('auth-token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      // You'd typically want to verify this token with your backend here
      // For simplicity, we're just setting it if it exists.
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('auth-token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
    setUser("");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  return ctx  
};