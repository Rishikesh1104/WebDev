const User = require("../models/User");
const Swap = require("../models/Swap");
const Feedback = require("../models/feedback");
const { Parser } = require("json2csv");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Ban a user
exports.banUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { isPublic: false });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User banned (made private)", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a feedback or spam content
exports.deleteFeedback = async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.feedbackId);
    res.json({ message: "Feedback deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Download swap report as CSV
exports.downloadSwapsCSV = async (req, res) => {
  try {
    const swaps = await Swap.find().populate("sender receiver", "name email");

    const fields = ["_id", "sender.name", "receiver.name", "skillOffered", "skillWanted", "status", "createdAt"];
    const parser = new Parser({ fields });
    const csv = parser.parse(swaps);

    res.header("Content-Type", "text/csv");
    res.attachment("swaps_report.csv");
    return res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
