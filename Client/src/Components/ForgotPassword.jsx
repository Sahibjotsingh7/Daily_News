import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/api/users/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      alert("OTP sent to your email!");
      navigate("/otp-verification", { state: { email } });
    } else {
      alert("Error sending OTP. Please check your email.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit}>Send OTP</button>
    </div>
  );
};

export default ForgotPassword;
