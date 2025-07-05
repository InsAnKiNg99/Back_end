// CreatePost.jsx
import React, { useState } from "react";
import axios from "axios";
import "./css/createpost.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/posts/create-post", {
        title,
        content,
      });
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
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
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
    </div>
  );
};

export default CreatePost;
