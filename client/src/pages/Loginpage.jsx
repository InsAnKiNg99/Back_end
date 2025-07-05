import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./css/login.css";
function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/users/login", {
        email,
        password,
      })
      .then((result) => {
        console.log(result);
        navigate("/");
      }) // Redirect to login page})
      .catch((e) => console.log("Login error: ",e.response?.data || e.message));
  };

  // Show/Hide Password
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((v) => !v);
  };
  return (
    <div>
      <div className="box">
        <form onSubmit={handleSubmit}>
          <div className="container">
            <h1>Login</h1>
            <div className="d-input">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                name="email"
                id="input"
              onChange={(e) => setEmail(e.target.value)}                
              placeholder="Enter Email"
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
                onChange={(e) => setPassword(e.target.value)}                
                placeholder="Enter Password"
                required
              />

              <div className="sep" />
              <button type="button" onClick={toggleVisibility}>
                {visible ? "🕳" : "👁"}
              </button>
              <Link id="Link">Forget password</Link>
            </div>
            <button type="submit" className="submit">
              Login
            </button>

            <p>Create an account</p>
            <Link to="/signup" className="signup">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Loginpage;
