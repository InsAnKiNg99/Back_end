// Homepage.jsx
import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaUserAlt,
  FaPenNib,
  FaEnvelope,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../services/useAuth";
import axios from "axios";
import Aboutpage from "./Aboutpage";
import Contactpage from "./Contactpage";
import CreatePost from "./CreatePost";
import "./css/hompage.css";

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
        console.log("Fetched posts:", res.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  const renderContent = () => {
    switch (activePage) {
      case "home":
        return (
          <>
            <h2>Home</h2>
            <p>Welcome to the blog. Explore posts and learn more about us.</p>
            <div className="post-grid">
              {posts.map((post, index) => (
                <article className="post-card" key={post.id}>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                </article>
              ))}
            </div>
          </>
        );
      case "about":
        return ( 
          <Aboutpage/>
        );
      case "posts":
        return <CreatePost />;

      case "contact":
        return (
          <Contactpage/>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Professional Blog</h1>
      </header>

      <div className="main-content">
        <aside className="sidebar">
          <nav>
            <ul>
              <li onClick={() => setActivePage("home")}>
                <FaHome className="icon" title="Home" />
              </li>
              <li onClick={() => setActivePage("about")}>
                <FaUserAlt className="icon" title="About" />
              </li>
              <li onClick={() => setActivePage("posts")}>
                <FaPenNib className="icon" title="Posts" />
              </li>
              <li onClick={() => setActivePage("contact")}>
                <FaEnvelope className="icon" title="Contact" />
              </li>
            </ul>
          </nav>
          <nav>
            {user ? (
              <ul>
                <li>
                  <a href="/">
                    <FaSignOutAlt
                      className="icon"
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
                    <FaSignInAlt className="icon" title="Login / Signup" />
                  </a>
                </li>
              </ul>
            )}
          </nav>
        </aside>

        <section className="content">{renderContent()}</section>
      </div>

      <footer className="footer">
        &copy; {new Date().getFullYear()} Professional Blog. All rights
        reserved.
      </footer>
    </div>
  );
};

export default Homepage;
