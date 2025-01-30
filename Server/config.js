require("dotenv").config();
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
     // useNewUrlParser: true,
      //useUnifiedTopology: true,
    });
    console.log("Database is Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// Email transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // 465 for SSL, 587 for TLS
    secure: false, // Use TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  

module.exports = { connectDB, transporter };
