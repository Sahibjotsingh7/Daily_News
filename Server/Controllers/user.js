const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { transporter } = require("../config"); // Import transporter
const crypto = require("crypto");

const otpMap = new Map(); // Temporary OTP storage

// Signup
const signup = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, mobile });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    // Prepare user data for response (exclude password)
    const user = { name: newUser.name, email: newUser.email, isAdmin: newUser.isAdmin };

    res.status(201).json({
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    if (user.isBlocked) return res.status(403).json({ message: "Your account is blocked" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    const userResponse = { name: user.name, email: user.email, isAdmin: user.isAdmin };

    res.status(200).json({ message: "Login successful", token, user: userResponse });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Forgot Password - Send OTP
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const otp = crypto.randomInt(100000, 999999);
    const expiresAt = Date.now() + 15 * 60 * 1000; // 15 mins expiry
    otpMap.set(email, { otp, expiresAt });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is ${otp}. It will expire in 15 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error sending OTP", error: error.message });
  }
};

// Verify OTP
const verifyOTP = (req, res) => {
  const { email, otp } = req.body;

  if (!otpMap.has(email)) return res.status(400).json({ success: false, message: "Invalid or expired OTP" });

  const { otp: storedOtp, expiresAt } = otpMap.get(email);

  if (Date.now() > expiresAt) {
    otpMap.delete(email);
    return res.status(400).json({ success: false, message: "OTP expired" });
  }

  if (parseInt(otp, 10) !== storedOtp) {
    return res.status(400).json({ success: false, message: "Incorrect OTP" });
  }

  otpMap.delete(email);
  res.status(200).json({ success: true, message: "OTP verified successfully" });
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = { signup, login, forgotPassword, verifyOTP, resetPassword };