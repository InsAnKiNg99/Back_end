const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const { createPost, getPost } = require("../controllers/post.controller");

router.post("/create-post", authMiddleware, createPost);
router.get('/get-posts',authMiddleware, getPost);

module.exports = router;
