// Load environment variables
require('dotenv').config();

// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", require("./Routs/UserRouts"));
app.use("/api/swaps", require("./Routs/SwapRouts"));     // ✅ Match filename if needed
app.use("/api/feedback", require("./Routs/Feedbackrouts"));
app.use("/api/admin", require("./Routs/Adminrouts"));

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Skill Swap API" });
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => console.error("MongoDB connection failed:", err));
