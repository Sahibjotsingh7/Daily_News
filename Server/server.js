require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import cors
const { connectDB } = require("./config");
const userRoutes = require("./Routes/userRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors()); // Allow all origins (you can customize this for specific origins)

// Connect to the database
connectDB();

app.use(express.json());
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello, Express Server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
