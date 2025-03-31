require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { connectDB } = require("./config");
const userRoutes = require("./Routes/userRoutes");
const tokenRoute = require("./Routes/tokenRoute");
const articleRoutes = require("./Routes/articleRoutes");
const lostFoundRoute = require("./Routes/LostFoundRoute");
const adminRoutes = require("./Routes/adminRoutes");

const app = express();
const PORT = process.env.PORT || 8080; // Default to 8080 as per your .env

// Enable CORS
app.use(cors());

// Connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Remove static file serving for uploads since we're using Cloudinary
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api", tokenRoute);
app.use("/api/articles", articleRoutes);
app.use("/api/lost&found", lostFoundRoute); // Consistent route prefix
app.use("/api/admin", adminRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Hello, Express Server!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});