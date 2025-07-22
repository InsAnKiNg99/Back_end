import React from "react";
import styles from "./css/footer.module.css";
function Footer() {
  return (
    <div>
      {" "}
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} Professional Blog. All rights
        reserved.
      </footer>
    </div>
  );
}

export default Footer;
