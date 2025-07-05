const Post = require('../models/Post.model')

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new Post({ title, content });
    await newPost.save();
    res.status(201).json({ message: "Post created", post: newPost });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
module.exports = {
    createPost
};