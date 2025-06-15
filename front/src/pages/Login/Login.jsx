import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../store/slices/user.slice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here (API call etc.)
    // api call
    // set state
    // store token to local storage
    console.log(credentials);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/login`,
        credentials
      );
      console.log(response.data);

      dispatch(setUserDetails(response.data.user));
      navigate("/");
    } catch (error) {
      console.log("Error in login", error);
    }
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
          <p>
            Don't have an account ? <Link to={"/signup"}>Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
