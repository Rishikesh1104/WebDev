const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  swapId: { type: mongoose.Schema.Types.ObjectId, ref: "Swap", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Feedback", feedbackSchema);
