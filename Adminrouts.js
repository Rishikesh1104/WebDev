const express = require("express");
const router = express.Router();
const protect = require("../middleware/Authmiddleware");
const adminOnly = require("../middleware/AdminMiddleware");

const {
  getAllUsers,
  banUser,
  deleteFeedback,
  downloadSwapsCSV
} = require("../controllers/AdminController");

router.use(protect, adminOnly);

router.get("/users", getAllUsers);
router.put("/ban/:userId", banUser);
router.delete("/feedback/:feedbackId", deleteFeedback);
router.get("/swaps/export", downloadSwapsCSV);

module.exports = router;
