// CreatePost.jsx
import React, { useState } from "react";
import axios from "axios";
import "./css/createpost.css";

const CreatePost = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setMessage("Title and Content cannot be empty")
     return;}

    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts/create-post",
        { title, content },
        {
          headers: {
            "x-auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      
      const newPost = { title: title, content: content };
      setPosts([newPost, ...posts]);
      setMessage("Post created successfully!");
      setTitle("");
      setContent("");

      console.log(res.data);
    } catch (error) {
      console.error(error);
      setMessage("Error creating post.");
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create New Post</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="post-form">
        <label htmlFor="Title">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label htmlFor="Content">
          Content:
          <textarea
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create Post</button>
      </form>
      <div className="post-grid">
        {posts.map((post, index) => (
           <article className="post-card" key={post.id || post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default CreatePost;
