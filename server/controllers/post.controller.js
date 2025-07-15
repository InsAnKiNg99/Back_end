const Post = require("../models/Post.model");

const createPost = async (req, res) => {
  try {
      console.log("req.user:", req.user);
  console.log("req.body:", req.body);
    const { title, content } = req.body;
    const newPost = new Post({
      title,
      content,
      author: req.user.id,
    });
    console.log(newPost);
    await newPost.save();
    res.status(201).json({ message: "Post created", post: newPost });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getPosts = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const posts = await Post.find({ author: req.user.id });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = {
  createPost,
  getPosts,
};
