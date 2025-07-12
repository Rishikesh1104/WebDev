const express = require("express");
const router = express.Router();
const Swap = require("../models/Swap"); // Make sure this model exists
const authMiddleware = require("../middleware/Authmiddleware"); // Optional: for protected routes

// 🔁 POST: Create a new skill swap request
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { skillOffered, skillWanted, receiver } = req.body;
    const swap = new Swap({
      sender: req.user.id,
      receiver,
      skillOffered,
      skillWanted,
      status: "pending"
    });

    await swap.save();
    res.status(201).json(swap);
  } catch (err) {
    res.status(500).json({ message: "Failed to create swap", error: err.message });
  }
});

// 📄 GET: Get all swap requests (admin or own swaps)
router.get("/", async (req, res) => {
  try {
    const swaps = await Swap.find()
      .populate("sender", "name email")
      .populate("receiver", "name email");
    res.json(swaps);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch swaps", error: err.message });
  }
});

// ✅ PUT: Accept a swap request
router.put("/accept/:id", authMiddleware, async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id);
    if (!swap) return res.status(404).json({ message: "Swap not found" });

    swap.status = "accepted";
    await swap.save();

    res.json({ message: "Swap accepted", swap });
  } catch (err) {
    res.status(500).json({ message: "Failed to accept swap", error: err.message });
  }
});

// ❌ PUT: Reject a swap request
router.put("/reject/:id", authMiddleware, async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id);
    if (!swap) return res.status(404).json({ message: "Swap not found" });

    swap.status = "rejected";
    await swap.save();

    res.json({ message: "Swap rejected", swap });
  } catch (err) {
    res.status(500).json({ message: "Failed to reject swap", error: err.message });
  }
});

module.exports = router;
