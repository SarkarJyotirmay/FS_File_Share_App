import React, { useState } from "react";
import styles from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState({ ...initialState });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API logic here
    // console.log(formData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/register`,
        formData
      );
      console.log(response.data);
      navigate("/login");
      setFormData(initialState);
    } catch (error) {
      console.log("Error in sign up", error);
    }
  };

  return (
    <div className={styles["signup-container"]}>
      <div className={styles["signup-card"]}>
        <h2 className={styles["signup-title"]}>Create Account</h2>
        <form onSubmit={handleSubmit} className={styles["signup-form"]}>
          <div className={styles["form-group"]}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className={styles["form-group"]}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
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
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              required
            />
          </div>

          <button type="submit" className={styles["submit-btn"]}>
            Sign Up
          </button>
          <p>
            Already have an account ? <Link to={"/login"}>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
