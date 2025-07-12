const Swap = require("../models/Swap");

// Send swap request
exports.createSwap = async (req, res) => {
  const { receiverId, skillOffered, skillWanted } = req.body;

  try {
    const swap = new Swap({
      sender: req.user._id,
      receiver: receiverId,
      skillOffered,
      skillWanted
    });

    await swap.save();
    res.status(201).json({ message: "Swap request sent", swap });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Accept/Reject request
exports.updateSwapStatus = async (req, res) => {
  const { swapId } = req.params;
  const { status } = req.body;

  try {
    const swap = await Swap.findById(swapId);

    if (!swap) return res.status(404).json({ message: "Swap not found" });
    if (swap.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    swap.status = status;
    await swap.save();

    res.json({ message: `Swap ${status}`, swap });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all swaps for user
exports.getSwaps = async (req, res) => {
  try {
    const swaps = await Swap.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }]
    })
      .populate("sender", "name skillsOffered")
      .populate("receiver", "name skillsWanted")
      .sort({ createdAt: -1 });

    res.json(swaps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete pending swap
exports.deleteSwap = async (req, res) => {
  const { swapId } = req.params;

  try {
    const swap = await Swap.findById(swapId);

    if (!swap) return res.status(404).json({ message: "Swap not found" });
    if (swap.sender.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    if (swap.status !== "pending") {
      return res.status(400).json({ message: "Only pending swaps can be deleted" });
    }

    await swap.deleteOne();
    res.json({ message: "Swap deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
