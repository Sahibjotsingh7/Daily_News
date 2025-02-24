const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(403).json({ message: "No token provided" });
  
    const token = authHeader.split(" ")[1]; // Remove "Bearer "
    if (!token) return res.status(403).json({ message: "Invalid token format" });
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid or expired token" });
      req.user = user; // Attach user info to request
      next();
    });
  };

module.exports = authenticateToken;
