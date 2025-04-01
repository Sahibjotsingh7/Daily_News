require("dotenv").config();
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2; // Import Cloudinary

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database is Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Ensure it's an App Password
  },
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Multer storage configuration (memory storage for Cloudinary upload)
const storage = multer.memoryStorage(); // Use memory storage since we'll upload to Cloudinary

// File filter for images and videos
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "video/mp4", "video/webm"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error("Only images (JPEG, PNG) and videos (MP4, WebM) are allowed"), false);
  }
};

// Multer instance
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: fileFilter,
});

module.exports = { connectDB, transporter, upload, cloudinary };