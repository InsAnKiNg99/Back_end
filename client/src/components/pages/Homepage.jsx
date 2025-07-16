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
} from "react-icons/fa";
import { useAuth } from "../services/useAuth";
import axios from "axios";
import Aboutpage from "./Aboutpage";
import Contactpage from "./Contactpage";
import CreatePost from "./CreatePost";
import styles from"./css/hompage.module.css";
import Profilepage from "./Profilepage";

const Homepage = () => {
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [activePage, setActivePage] = useState("home");
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
          <li onClick={() => setActivePage("about")}>
            <FaUserAlt className={styles.icon} title="About" />
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
                <FaSignInAlt className={styles.icon} title="Login / Signup" />
              </a>
            </li>
          </ul>
        )}
      </nav>
    </aside>

    <section className={styles.content}>
      {activePage === "home" && (
        <div className={styles.dashboard}>
          <h2>Home</h2>
          <p>Welcome to the blog. Explore posts and learn more about us.</p>
          <br />
          <br />
          <br />
          <h1>Recent Post</h1>
          <div className={styles.postGrid}>
            {posts.map((post) => (
              <article className={styles.postCard} key={post._id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
              </article>
            ))}
          </div>
        </div>
      )}
      {activePage === "about" && <Aboutpage />}
      {activePage === "posts" && <CreatePost />}
      {activePage === "profile" && <Profilepage />}
      {activePage === "contact" && <Contactpage />}
    </section>
  </div>

  <footer className={styles.footer}>
    &copy; {new Date().getFullYear()} Professional Blog. All rights reserved.
  </footer>
</div>

  );
};

export default Homepage;
