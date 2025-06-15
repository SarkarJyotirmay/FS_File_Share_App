import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <h1>Logo</h1>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li><Link className={styles.link} to={"/"}>Home</Link></li>
          <li><Link className={styles.link} to={"/files"}>Files</Link></li>
          <li><Link className={styles.link} to={"/contact"}>Contact Us</Link></li>
          <li><Link className={styles.link} to={"/about"}>About Us</Link></li>
          <li><Link className={styles.link} to={"/signup"}>Sign Up</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
