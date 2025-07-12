const Feedback = require("../models/feedback");
const Swap = require("../models/Swap");

exports.leaveFeedback = async (req, res) => {
  const { toUserId, swapId, rating, comment } = req.body;

  try {
    // Verify the swap is completed and involves the user
    const swap = await Swap.findById(swapId);
    if (!swap || swap.status !== "accepted") {
      return res.status(400).json({ message: "Swap is not completed or invalid" });
    }

    if (
      swap.sender.toString() !== req.user._id.toString() &&
      swap.receiver.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const feedback = new Feedback({
      fromUser: req.user._id,
      toUser: toUserId,
      swapId,
      rating,
      comment,
    });

    await feedback.save();
    res.status(201).json({ message: "Feedback submitted", feedback });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserFeedback = async (req, res) => {
  const { userId } = req.params;

  try {
    const feedbacks = await Feedback.find({ toUser: userId })
      .populate("fromUser", "name")
      .sort({ createdAt: -1 });

    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
