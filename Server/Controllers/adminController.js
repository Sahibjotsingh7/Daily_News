// Controllers/adminController.js
const Article = require("../Models/Article");
const LostFound = require("../Models/LostFound");
const User = require("../Models/User");
const mongoose = require('mongoose');

// Delete any article
exports.deleteAnyArticle = async (req, res) => {
  try {
    const { articleId } = req.params;
    const article = await Article.findById(articleId);

    if (!article) return res.status(404).json({ message: "Article not found" });

    await Article.findByIdAndDelete(articleId);
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete any lost & found item
// Controllers/adminController.js
const cloudinary = require("cloudinary").v2; // Ensure Cloudinary is imported if used

exports.deleteAnyLostFound = async (req, res) => {
  try {
    const { itemId } = req.params;
    console.log("Deleting Lost & Found Item with ID:", itemId); // Debug log

    // Validate itemId
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Invalid item ID format" });
    }

    const item = await LostFound.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Delete from Cloudinary if publicId exists
    if (item.publicId) {
      try {
        await cloudinary.uploader.destroy(item.publicId);
        console.log("Cloudinary resource deleted:", item.publicId);
      } catch (cloudinaryError) {
        console.error("Cloudinary deletion failed:", cloudinaryError.message);
        // Proceed with deletion even if Cloudinary fails (optional)
      }
    }

    await LostFound.findByIdAndDelete(itemId);
    console.log("Lost & Found item deleted from DB:", itemId);
    res.status(200).json({ message: "Lost & Found item deleted successfully" });
  } catch (error) {
    console.error("Error in deleteAnyLostFound:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Block a user
exports.blockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isAdmin) return res.status(403).json({ message: "Cannot block an admin" });

    user.isBlocked = true;
    await user.save();
    res.status(200).json({ message: "User blocked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Unblock a user
exports.unblockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.isBlocked = false;
    await user.save();
    res.status(200).json({ message: "User unblocked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all users (for admin panel)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};