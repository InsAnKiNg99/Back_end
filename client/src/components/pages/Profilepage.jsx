import React from "react";
import axios from "axios";
import { useState } from "react";
import styles from'./css/profile.module.css'

function Profilepage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passMessage, setPassMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setPassMessage("Password Confirmed!");
    } else {
      setPassMessage("Password not Confirmed!");
    }
    try {
      const res = await axios.put("http://localhost:5000/api/users/profile/:id", {
        name,
        email,
        password,
      }, {
        headers: {
          "x-auth-token": localStorage.getItem("auth-token"),
        }
      });
      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email,
        })
      );
      setMessage("Edited Successfully!");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
  <div className={styles.container}>
    <h2>Update My Profile</h2>
    <br />
    <br />
    <br />
    <form onSubmit={handleSubmit}>
      {message && <p className={styles.message}>{message}</p>}
      <input
        type="text"
        className={styles.name}
        placeholder="Enter new name"
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        className={styles.email}
        placeholder="Enter new email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        className={styles.password}
        placeholder="Enter new password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        name="confirmPassword"
        className={styles.password}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm new Password"
        required
      />
      {passMessage && <p className={styles.passMess}>{passMessage}</p>}
      <button type="submit">Update</button>
    </form>
  </div>
  <button type="submit">Delete Account</button>
</div>

  );
}

export default Profilepage;
