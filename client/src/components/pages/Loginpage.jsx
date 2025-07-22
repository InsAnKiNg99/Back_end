import React from "react";
import axios from "axios";
import { useAuth } from "../services/useAuth.js";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./css/login.module.css";
function Loginpage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login: authLogin } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("auth-token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: response.data._id,
          name: response.data.name,
          email: response.data.email,
        })
      );
      authLogin(response.data.token, {
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
      });
      setMessage("Login successful!");
      window.location.href = "/";
    } catch (error) {
      console.error("Login error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((v) => !v);
  };
  return (
    <div>
      <div className={styles.box}>
        <form onSubmit={handleSubmit}>
          <div className={styles.container}>
            <h1 className={styles.label}>Login</h1>

            <div className={styles.dInput}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                name="email"
                className={styles.input}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                required
              />
              <div className={styles.sep} />
            </div>

            <div className={styles.dInput}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type={visible ? "text" : "password"}
                name="password"
                className={styles.pin}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
              />
              <div className={styles.sep} />
              <button type="button" className={styles.show} onClick={toggleVisibility}>
                {visible ? "🕳" : "👁"}
              </button>
              <Link className={styles.link}>Forget password</Link>
            </div>

            <button type="submit" className={styles.submit}>
              Login
            </button>   
              {message && <p className="message">{message}</p>}
            <p className={styles.label}>Create an account</p>
            <Link to="/signup" className={styles.signup}>
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Loginpage;
