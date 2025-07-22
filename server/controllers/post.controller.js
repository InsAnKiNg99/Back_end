const Post = require("../models/Post.model");

const createPost = async (req, res) => {
  try {
    console.log("req.user:", req.user);
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

const getPost = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const posts = await Post.find({ author: req.user.id }).populate(
      "author",
      "name"
    );
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name")
      .then((posts) => posts.filter((post) => post.author));
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const updatePost = async (req, res) => {
  console.log("req.user:", req.user);
console.log("req.body:", req.body);

  const { title, content } = req.body;
  try {
    const post = await Post.findOne({ author: req.user.id });
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (title) post.title = title;
    if (content) post.content = content;
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
};
