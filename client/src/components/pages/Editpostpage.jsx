import React, { useState, useEffect } from "react";
import styles from "./css/editpost.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Editpostpage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postId, setPostId] = useState("");
  const [message, setMessage] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state) {
      setTitle(state.title);
      setContent(state.content);
      setPostId(state.postId);
    }
  }, [state]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setMessage("Title and Content cannot be empty");
      return;
    }

    try {
      const res = await axios.put(
        "http://localhost:5000/api/posts/update-post",
        { id: postId, title, content },
        {
          headers: {
            "x-auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      setMessage("Post created successfully!");
      navigate("/");
      res.status(201).json(postId, title, content);
    } catch (error) {
      setMessage("Error Updating post");
    }
  };
  return (
    <div className={styles.createPostContainer}>
      <h3 className={styles.heading}>Update Post</h3>
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
        <button type="submit" className={styles.button}>
          Update Post
        </button>
      </form>
    </div>
  );
}

export default Editpostpage;
