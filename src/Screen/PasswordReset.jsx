import React, { useState } from "react";
import "./ForgotPassword.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // console.log("Reset password request submitted for:", email);
    // try {
    //   let { data } = await axios.post(`http://localhost:5500/api/v1/forgot-password`, { email });
    //   if (data.error === false) {
    //     alert(data.message);
    //     navigation("/");
    //   }
    // } catch (err) {
    //   console.error(err);
    //   alert(err.response.data.message);
    // }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Enter Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <button type="submit" className="reset-btn">
            Reset Password
          </button>
        </form>
        <p className="login-link">
          Remember your password? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
