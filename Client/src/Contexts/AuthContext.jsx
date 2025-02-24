import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("token"); // Check if token exists
  });
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null; // Load user from storage
  });

  useEffect(() => {
    const checkTokenValidity = async () => {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        setIsLoggedIn(false);
        setUser(null);
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/auth/verify-token", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${storedToken}`,
            "Content-Type": "application/json"
          },
        });
        

        console.log(response);

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setIsLoggedIn(true);
        } else {
          logout(); // Call logout if token is invalid
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        logout(); // Ensure logout on failure
      }
    };

    checkTokenValidity();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
