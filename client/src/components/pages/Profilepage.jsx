import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../services/useAuth";
import styles from "./css/profile.module.css";

function Profilepage(showModal) {
  const { logout } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [popup, setPopup] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passMessage, setPassMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPassMessage("Password not Confirmed!");
      return;
    }
    try {
      const res = await axios.put(
        "http://localhost:5000/api/users/profile",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email,
        })
      );
      setMessage("Edited Successfully!");
      setName(res.data.name);
      setEmail(res.data.email);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteUser = async (e) => {
    e.preventDefault();
    try {
      await axios.delete("http://localhost:5000/api/users/delete", {
        headers: {
          "x-auth-token": localStorage.getItem("auth-token"),
        },
      });
      localStorage.removeItem("user");
      if (typeof logout === "function") {
        logout();
      }
      setMessage("Deleted Successfully!");
      setName("");
      setEmail("");
    } catch (error) {
      console.log(error);
      setMessage("Failed to delete the User!");
    }
  };
  return (
    <div>
      <div className={styles.container}>
        <h3>Update My Profile</h3>
        <br />
        <br />
        <br />
        <form onSubmit={handleSubmit}>
          {message && <p className={styles.message}>{message}</p>}
          <div className={styles.set}>
            {name && <h1>{name}</h1>}
            {email && <h2>{email}</h2>}
          </div>
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
      <button
        type="submit"
        onClick={() => {
          setPopup(true);
        }}
      >
        Delete Account
      </button>
      {popup && (
        <div className={styles.overlay}>
          <div className={`${styles.modal} ${showModal ? styles.show : ""}`}>
            <p>Do you want to delete your account</p>
            <div className={styles.buttons}>
              <button
                type="button"
                onClick={() => {
                  setPopup(false);
                }}
              >
                Cancle
              </button>
              <button type="button" onClick={deleteUser}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profilepage;
