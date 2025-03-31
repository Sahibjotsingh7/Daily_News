// Routes/adminRoutes.js
const express = require("express");
const {
  deleteAnyArticle,
  deleteAnyLostFound,
  blockUser,
  unblockUser,
  getAllUsers,
} = require("../Controllers/adminController");
const authenticateToken = require("../Middlewares/tokenValidation");
const authenticateAdmin = require("../Middlewares/adminValidation");

const router = express.Router();

// Admin routes (protected by both token and admin check)
router.delete("/articles/:articleId", authenticateToken, authenticateAdmin, deleteAnyArticle);
router.delete("/lost&found/:itemId", authenticateToken, authenticateAdmin, deleteAnyLostFound);
router.put("/users/block/:userId", authenticateToken, authenticateAdmin, blockUser);
router.put("/users/unblock/:userId", authenticateToken, authenticateAdmin, unblockUser);
router.get("/users", authenticateToken, authenticateAdmin, getAllUsers);

module.exports = router;