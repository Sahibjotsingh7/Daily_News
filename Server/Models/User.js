// Models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }, // Add this field
  isBlocked: { type: Boolean, default: false }, // Add this field to block users
});

module.exports = mongoose.model("User", userSchema);