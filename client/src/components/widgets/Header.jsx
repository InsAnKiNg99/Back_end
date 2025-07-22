import React from "react";
import styles from "./css/header.module.css"

function header() {
  return (
    <div>
      <header className={styles.header}>
        <h1>Professional Blog</h1>
      </header>
    </div>
  );
}

export default header;
