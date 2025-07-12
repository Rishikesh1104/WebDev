const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { name, location, skillsOffered, skillsWanted, availability, isPublic, profilePhoto } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (location) user.location = location;
    if (skillsOffered) user.skillsOffered = skillsOffered;
    if (skillsWanted) user.skillsWanted = skillsWanted;
    if (availability) user.availability = availability;
    if (typeof isPublic === "boolean") user.isPublic = isPublic;
    if (profilePhoto) user.profilePhoto = profilePhoto;

    await user.save();
    res.json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
