// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const passwordRoutes = require("./routes/passwordRoutes"); // 👈 import your routes file
const db = require("./db.js"); // 👈 your MySQL connection file

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/passwords", passwordRoutes);

// Test route (optional)
app.get("/", (req, res) => {
  res.send("✅ SafePass Backend is running!");
});

// Server
const PORT = 6001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
