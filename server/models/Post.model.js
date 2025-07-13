const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = mongoose.Schema({
    title: String,
    content: String,
    author: {
    type: Schema.Types.ObjectId, // This is the key!
    ref: 'User', // Reference to your User model
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model("Post", postSchema)
module.exports = Post;