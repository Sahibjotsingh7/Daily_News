import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import "../App.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const email = storedUser?.email || location.state?.email;

  useEffect(() => {
    if (!email) {
      alert("Please log in to reset your password!");
      navigate("/login"); // Redirect to login page
    }
  }, [email, navigate]);

  const handleReset = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert("Password reset successful! Please login.");
        navigate("/login");
      } else {
        alert("Error resetting password. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong! Try again later.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="Enter New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default ResetPassword;
