import React from "react";
import { useAuth } from "../Contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  return user ? <h2>Welcome, {user.name}</h2> : <Navigate to="/login" />;
};

export default Dashboard;
