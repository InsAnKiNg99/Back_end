// Homepage.jsx
import React, { useState } from "react";
import { FaHome, FaUserAlt, FaPenNib, FaEnvelope } from "react-icons/fa";
import "./css/hompage.css";

const Homepage = () => {
  const [activePage, setActivePage] = useState("home");
  const [posts, setPosts] = useState([]);

const [newTitle, setNewTitle] = useState("");
const [newContent, setNewContent] = useState("");

  const handleCreatePost = (e) => {
  e.preventDefault();
  if (!newTitle.trim() || !newContent.trim()) return;
  const newPost = { title: newTitle, content: newContent };
  setPosts([newPost, ...posts]);
  setNewTitle("");
  setNewContent("");
};


  const renderContent = () => {
    switch (activePage) {
      case "home":
        return (
          <>
            <h2>Home</h2>
            <p>Welcome to the blog. Explore posts and learn more about us.</p>
          </>
        );
      case "about":
        return (
          <>
            <h2>About</h2>
            <p>
              This blog shares insights on clean code, design, and modern
              development practices.
            </p>
          </>
        );
      case "posts":
        return (
          <>
            <h2>Posts</h2>
            <form onSubmit={handleCreatePost} className="post-form">
              <label>
                Title:
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </label>
              <label>
                Content:
                <textarea
                  rows="4"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  required
                />
              </label>
              <button type="submit">Create Post</button>
            </form>
            <div className="post-grid">
              {posts.map((post, index) => (
                <article className="post-card" key={index}>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                </article>
              ))}
            </div>
          </>
        );

      case "contact":
        return (
          <>
            <h2>Contact</h2>
            <p>Email: example@example.com</p>
            <p>Twitter: @example</p>
          </>
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
