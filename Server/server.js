require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config");
const userRoutes = require("./Routes/userRoutes");
const tokenRoute = require("./Routes/tokenRoute");
const articleRoutes = require("./Routes/articleRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Connect to the database
connectDB();

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api", tokenRoute);
app.use("/api/articles", articleRoutes);

app.get("/", (req, res) => {
  res.send("Hello, Express Server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
