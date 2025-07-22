const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const {
  createPost,
  getPosts,
  getPost,
  updatePost,
} = require("../controllers/post.controller");

router.post("/create-post", authMiddleware, createPost);
router.get("/get-post", authMiddleware, getPost);
router.get("/get-posts", authMiddleware, getPosts);
router.put("/update-post", authMiddleware, updatePost);

module.exports = router;
