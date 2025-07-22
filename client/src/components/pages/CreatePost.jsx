// CreatePost.jsx
import React, { useState } from "react";
import axios from "axios";
import styles from "./css/createpost.module.css";

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
    <div className={styles.createPostContainer}>
  <h3 className={styles.heading}>Create New Post</h3>
  <form onSubmit={handleSubmit} className={styles.postForm}>
    <label>
      Title:
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className={styles.input}
      />
    </label>
    <label>
      Content:
      <textarea
        rows="6"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className={styles.textarea}
      />
    </label>
    {message && <p className={styles.message}>{message}</p>}
    <button type="submit" className={styles.button}>Create Post</button>
  </form>
</div>

  );
};

export default CreatePost;
