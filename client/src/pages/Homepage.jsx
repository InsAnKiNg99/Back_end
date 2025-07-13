// Homepage.jsx
import React, { useState } from "react";
import {
  FaHome,
  FaUserAlt,
  FaPenNib,
  FaEnvelope,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../services/useAuth";
import CreatePost from "./CreatePost";
import "./css/hompage.css";

const Homepage = () => {
  const { user, logout } = useAuth();
  const [activePage, setActivePage] = useState("home");

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
        return <CreatePost />;

      case "contact":
        return (
          <>
            <h2>Contact</h2>
            <p>
              <b>Email</b>: muneerhameedb@gmail.com
            </p>
            <br />
            <p>
              <b>Discord</b>: InsAnKiNg99
            </p>
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
