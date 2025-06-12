import React from "react";
import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>📁 FileShare — Share your files securely & instantly.</p>
      <div className={styles["footer-links"]}>
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Contact</a>
      </div>
      <p>&copy; {new Date().getFullYear()} FileShare. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
