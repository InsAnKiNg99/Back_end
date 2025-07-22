// Homepage.jsx
import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaUserAlt,
  FaPenNib,
  FaEnvelope,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserCircle,
  FaTachometerAlt,
} from "react-icons/fa";
import { useAuth } from "../services/useAuth";
import axios from "axios";
import Aboutpage from "./Aboutpage";
import Contactpage from "./Contactpage";
import CreatePost from "./CreatePost";
import styles from "./css/hompage.module.css";
import Profilepage from "./Profilepage";
import Dashboard from "./Dashboard";
const Homepage = (showModal) => {
  const { user, logout } = useAuth();
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activePage, setActivePage] = useState("home");
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/posts/get-posts",
          {
            headers: {
              "x-auth-token": localStorage.getItem("auth-token"),
            }
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
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Professional Blog</h1>
      </header>

      <div className={styles.mainContent}>
        <aside className={styles.sidebar}>
          <nav>
            <ul>
              <li onClick={() => setActivePage("home")}>
                <FaHome className={styles.icon} title="Home" />
              </li>
              <li onClick={() => setActivePage("dashboard")}>
                <FaTachometerAlt className={styles.icon} title="dashboard" />
              </li>
              <li onClick={() => setActivePage("posts")}>
                <FaPenNib className={styles.icon} title="Posts" />
              </li>
              <li onClick={() => setActivePage("profile")}>
                <FaUserCircle className={styles.icon} title="Profile" />
              </li>
              <li onClick={() => setActivePage("contact")}>
                <FaEnvelope className={styles.icon} title="Contact" />
              </li>
              <li onClick={() => setActivePage("about")}>
                <FaUserAlt className={styles.icon} title="About" />
              </li>

            </ul>
          </nav>
          <nav>
            {user ? (
              <ul>
                <li>
                  <a href="/">
                    <FaSignOutAlt
                      className={styles.icon}
                      title="Logout"
                      onClick={logout}
                    />
                  </a>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <a href="/login">
                    <FaSignInAlt
                      className={styles.icon}
                      title="Login / Signup"
                    />
                  </a>
                </li>
              </ul>
            )}
          </nav>
        </aside>

        <section className={styles.content}>
          {activePage === "home" && (
            <div className={styles.dashboard}>
              <h3>Home</h3>
              <p>
                Welcome to our digital haven — where ideas come to life, stories
                unfold, and curiosity is always rewarded. Explore our latest
                posts and take a closer look at who we are and what we’re
                passionate about.
              </p>
              <br />
              <h1>Recent Posts</h1>
              <div className={styles.postGrid}>
                {posts.length > 0 ? (posts.map((post) => (
                  <article
                    className={styles.postCard}
                    key={post._id}
                    onClick={() => setSelectedPost(post)}
                  >
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <small>{post.author.name}</small>
                  </article>
                ))): (<p>No posts available</p>)}
              </div>

              {selectedPost && (
                <div className={styles.overlay}>
                  <div
                    className={`${styles.modal} ${
                      showModal ? styles.show : ""
                    }`}
                    onClick={() => setSelectedPost(null)}
                  >
                    <div
                      className={styles.modalContent}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <h2>{selectedPost.title}</h2>
                      <br />
                      <p>{selectedPost.content}</p>
                      <br />
                      <p>{selectedPost.author.name}</p>
                      <br />
                      <button onClick={() => setSelectedPost(null)}>
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activePage === "about" && <Aboutpage />}
          {activePage === "posts" && <CreatePost />}
          {activePage === "profile" && <Profilepage />}
          {activePage === "contact" && <Contactpage />}
          {activePage === "dashboard" && <Dashboard />}
        </section>
      </div>

      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} Professional Blog. All rights
        reserved.
      </footer>
    </div>
  );
};

export default Homepage;
