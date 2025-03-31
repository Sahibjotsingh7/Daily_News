const mongoose = require("mongoose");

const lostFoundSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: { type: String },
  whereFound: { type: String, required: true },
  whenFound: { type: Date, required: true },
  uploaderName: { type: String, required: true },
  mobile: { type: String, required: true },
  mediaUrl: { type: String, required: true }, // Cloudinary URL
  publicId: { type: String }, // Cloudinary public ID for deletion if needed
  time: { type: Date, default: Date.now }, // Upload time
});

module.exports = mongoose.model("LostFound", lostFoundSchema);