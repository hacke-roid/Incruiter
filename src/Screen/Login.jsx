import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigation = useNavigate()
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      let { data } = await axios.post(`http://localhost:5500/api/v1/login`, {
        email,
        password,
      });
      console.log(data);
      if (data.error === false) {
        alert("Logged in successfully!");
        localStorage.setItem("token", data.token)
        localStorage.setItem('user', data.user)
        // Redirect to home page
        navigation("/dashboard");
      }
    } catch (err) {
      console.error(err.response);
      alert(err.response.data.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* {error && <p className="error">{error}</p>} */}
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <p className="register-link">
          Don't have an account? <a href="/register">Register</a>
        </p>
        <p className="register-link">Forgot Password? <a href="/recovery">Click here</a></p>
      </div>
    </div>
  );
};

export default Login;
