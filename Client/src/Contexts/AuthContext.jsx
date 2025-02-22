import React, { createContext, useState, useEffect, useContext } from 'react';

// Create Context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user info exists in localStorage
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser); // Attempt to parse user data
        setUser(parsedUser);
        setIsLoggedIn(true);  // If user data exists, mark as logged in
      } catch (error) {
        // If parsing fails, reset the user and token
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);  // Only runs once on component mount

  const login = (userData, token) => {
    // Save user info and token to localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Remove user info and token from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
