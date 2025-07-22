import React from "react";
import axios from "axios";
import { useState } from "react";
import styles from "./css/signup.module.css";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  // Data Storation
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //handling Submit of Data`
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/users/register", {
        name,
        password,
        email,
      })
      .then((result) => {
        console.log(result);
        navigate("/login");
      }) // Redirect to login page})
      .catch((e) => console.log("Signup error: ",e.response?.data || e.message));
  };

  // Show/Hide Password
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((v) => !v);
  };
  return (
    <div className={styles.box}>
  <form onSubmit={handleSubmit}>
    <div className={styles.container}>
      <h1 className={styles.label}>Register</h1>

      <div className={styles.dInput}>
        <label className={styles.label}>
          Name
        </label>
        <input
          type="text"
          name="name"
          className={styles.input}
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div className={styles.sep} />
      </div>

      <div className={styles.dInput}>
        <label className={styles.label}>
          Email
        </label>
        <input
          type="email"
          name="email"
          className={styles.input}
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className={styles.sep} />
      </div>

      <div className={styles.dInput}>
        <label className={styles.label}>
          Password
        </label>
        <input
          type={visible ? "text" : "password"}
          name="password"
          className={styles.pin}
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className={styles.sep} />

        <button type="button" onClick={toggleVisibility} className={styles.show}>
          {visible ? "🕳" : "👁"}
        </button>

        <Link className={styles.link}>Forget password</Link>
      </div>

      <button type="submit" className={styles.submit}>
        Register
      </button>

      <p className={styles.label}>Already have an account</p>
      <Link to="/login" className={styles.login}>
        Login
      </Link>
    </div>
  </form>
</div>


  );
}

export default Signup;
