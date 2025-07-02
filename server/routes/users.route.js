const express = require("express");
const router = express.Router();
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
// Get Users
router.get("/", getUsers);
// Get User
router.get("/:id", getUser);
// Update User
router.put("/:id", updateUser);
// Delete User
router.delete("/:id", deleteUser);

module.exports = router;
