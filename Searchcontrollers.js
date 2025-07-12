const User = require("../models/User");

// GET /api/users/search?skill=Excel
exports.searchUsers = async (req, res) => {
  const { skill } = req.query;

  try {
    let query = { isPublic: true };

    if (skill) {
      const regex = new RegExp(skill, "i");
      query.$or = [
        { skillsOffered: regex },
        { skillsWanted: regex }
      ];
    }

    const users = await User.find(query).select("-password");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
