const express = require("express");
const router = express.Router();
const { uploadFoundItem, getLostItems } = require("../Controllers/LostFoundController");
const { upload } = require("../config"); // Multer configuration from config.js

// POST route for uploading found items
router.post("/found", upload.single("media"), uploadFoundItem);

// GET route for fetching all lost items
router.get("/lost", getLostItems);

module.exports = router;