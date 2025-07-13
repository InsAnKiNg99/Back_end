const Post = require("../models/Post.model");

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new Post({
      title,
      content,
      author: req.user._id || req.user.id,
    });
    console.log({author: req.user._id});
    await newPost.save();
    res.status(201).json({ message: "Post created", post: newPost });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.find({ author: req.user._id });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  createPost,
  getPost,
};
