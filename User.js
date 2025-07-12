const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  profilePhoto: { type: String }, // URL to photo
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skillsOffered: [String],
  skillsWanted: [String],
  availability: [String], // e.g. ["weekends", "evenings"]
  isPublic: { type: Boolean, default: true },
  role: { type: String, enum: ["user", "admin"], default: "user" }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
