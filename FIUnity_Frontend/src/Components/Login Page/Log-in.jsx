import axios from "./axiosInstance";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Log-in.css";

export default function RegistrationLogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory(); //NEW CODE

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    const loginInfo = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:8000/authentication/login/", loginInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("Login successful");
          console.log("this is the response:", response);
          // Store CSRF token and user_id in local storage
          localStorage.setItem("csrfToken", response.data.token);
          localStorage.setItem("user_id", response.data.user_id);
          localStorage.setItem("first_name", response.data.first_name);
          localStorage.setItem("last_name", response.data.last_name);
          history.push("/newsfeed");
          // window.location.href = "http://localhost:5173/newsfeed";
          history.push("/newsfeed");

          // Check if data is stored
          const storedData = localStorage.getItem("csrfToken");

          // Log the stored data
          console.log("Stored Data:", storedData);
          
        } else {
          console.error("Login failed");
          setErrorMessage("Login failed. Please check your credentials.");
        }
      })
      .catch((error) => {
        console.error("Error sending login request:", error);
        setErrorMessage(
          "An error occurred while logging in. Please try again later."
        );
      });
  };

  return (
    <div className="registration-log-in">
      <div className="login-title">Login</div>
      <div className="input-container">
        <div className="input-wrapper">
          <input
            type="text"
            className="input-field"
            placeholder="Student FIU Email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            type="button"
            className="toggle-password-button"
            onClick={toggleShowPassword}
          >
            {showPassword ? "Hide" : "Show"}
          </button>

          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p className="OR-line">
          <span className="Login-line"></span> OR{" "}
          <span className="Login-line"></span>
        </p>
        <Link to="/authentication/register">
          <button className="registration-button">Register Here</button>
        </Link>
      </div>
    </div>
  );
}
