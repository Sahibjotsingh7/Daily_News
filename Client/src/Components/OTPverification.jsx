import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../App.css'

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {}; 

  const handleVerify = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/api/users/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    if (response.ok) {
      alert("OTP Verified! Proceed to reset your password.");
      navigate("/reset-password", { state: { email } });
    } else {
      alert("Invalid OTP. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>OTP Verification</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerify}>Verify</button>
    </div>
  );
};

export default OTPVerification;
