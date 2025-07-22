import React from "react";
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
import styles from "./css/navbar.module.css";
function Navbar() {
    const { user, logout } = useAuth();
  return (
    <div className={styles.mainContent}>
      <aside className={styles.sidebar}>
        <nav>
          <ul>
            <li onClick={() => {}}>
              <FaHome className={styles.icon} title="Home" />
            </li>
            <li onClick={() => {}}>
              <FaTachometerAlt className={styles.icon} title="dashboard" />
            </li>
            <li onClick={() => {}}>
              <FaPenNib className={styles.icon} title="Posts" />
            </li>
            <li onClick={() => {}}>
              <FaUserCircle className={styles.icon} title="Profile" />
            </li>
            <li onClick={() => {}}>
              <FaEnvelope className={styles.icon} title="Contact" />
            </li>
            <li onClick={() => {}}>
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
                  <FaSignInAlt className={styles.icon} title="Login / Signup" />
                </a>
              </li>
            </ul>
          )}
        </nav>
      </aside>
    </div>
  );
}

export default Navbar;
