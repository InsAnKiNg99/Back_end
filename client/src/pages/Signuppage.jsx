import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./css/signup.css";
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
    <div className="box">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <h1>Register</h1>
          <div className="d-input">
            <label htmlFor="email">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              name="name"
              id="input"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <div className="sep" />
          </div>
          <div className="d-input">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              name="email"
              id="input"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="sep" />
          </div>
          <div className="d-input">
            <label htmlFor="email">
              <strong>Password</strong>
            </label>
            <input
              type={visible ? "text" : "password"}
              name="password"
              id="input"
              className="pin"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="sep" />
            <button type="button" onClick={toggleVisibility}>
              {visible ? "🕳" : "👁"}
            </button>
            <Link id="Link">Forget password</Link>
          </div>
          <button type="submit" className="submit">
            Register
          </button>

          <p>Aready have an account</p>
          <Link to="/login" className="login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
