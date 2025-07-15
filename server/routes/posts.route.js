const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const { createPost, getPosts} = require("../controllers/post.controller");

router.post("/create-post", authMiddleware, createPost);
router.get('/get-post',authMiddleware, getPosts);

module.exports = router;
