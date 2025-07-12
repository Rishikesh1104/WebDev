const express = require("express");
const router = express.Router();
const protect = require("../middleware/Authmiddleware");
const { leaveFeedback, getUserFeedback } = require("../controllers/feedbackcontroller");

router.post("/", protect, leaveFeedback);
router.get("/:userId", getUserFeedback); // public view of ratings

module.exports = router;
