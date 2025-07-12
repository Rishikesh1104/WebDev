const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authcontrollers");
const { getProfile, updateProfile } = require("../controllers/usercontroller");
const { searchUsers } = require("../controllers/Searchcontrollers");
const protect = require("../middleware/Authmiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, getProfile);
router.put("/me", protect, updateProfile);
router.get("/search", searchUsers); // <-- new route for public search

module.exports = router;

