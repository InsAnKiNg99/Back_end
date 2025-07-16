const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  findUser,
} = require("../controllers/user.controller");

// Create User
router.post("/register", createUser);
// Find User
router.post("/login", findUser);
// Update User
router.put("/profile/:id",authMiddleware, updateUser);
// Delete User
router.delete("/:id", deleteUser);

module.exports = router;
