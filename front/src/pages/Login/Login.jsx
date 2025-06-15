import React, { useState } from "react";
import styles from "./Login.module.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here (API call etc.)
    console.log(credentials);
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-card"]}>
        <h2 className={styles["login-title"]}>Welcome Back</h2>
        <form onSubmit={handleSubmit} className={styles["login-form"]}>
          <div className={styles["form-group"]}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              required
            />
          </div>

          <div className={styles["form-group"]}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="********"
              required
            />
          </div>

          <button type="submit" className={styles["submit-btn"]}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
