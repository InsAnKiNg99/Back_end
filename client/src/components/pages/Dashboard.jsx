import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./css/dashboard.module.css";
import { useNavigate } from "react-router-dom";

function Dashboard(showModal) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const handleEdit = function (post) {
    navigate("/edit-post", { state: post });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/posts/get-post",
          {
            headers: {
              "x-auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        setPosts(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div style={styles.dashboard}>
      <h3>My Posts</h3>
      <div className={styles.postGrid}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <article
              className={styles.postCard}
              key={post._id}
              onClick={() => setSelectedPost(post)}
            >
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </article>
          ))
        ) : (
          <p>No post written</p>
        )}
      </div>

      {selectedPost && (
        <div className={styles.overlay}>
          <div
            className={`${styles.modal} ${showModal ? styles.show : ""}`}
            onClick={() => setSelectedPost(null)}
          >
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>{selectedPost.title}</h2>
              <br />
              <p>{selectedPost.author.name}</p>
              <br />
              <p>{selectedPost.content}</p>
              <br />
              <div className={styles.buttons}>
                {" "}
                <button onClick={() => setSelectedPost(null)}>Close</button>
                {posts.map((post) => (
                  <button onClick={() => handleEdit(post)}>Edit</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
