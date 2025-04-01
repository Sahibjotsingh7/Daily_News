const express = require("express");
const authenticateToken = require("../Middlewares/tokenValidation");

const router = express.Router();

router.get("/auth/verify-token", authenticateToken, (req, res) => {
  res.json({ message: "Token is valid", user: req.user });
});

module.exports = router;
