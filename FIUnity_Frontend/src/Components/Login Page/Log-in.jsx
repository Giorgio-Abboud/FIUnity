import axios from "./axiosInstance";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Log-in.css";

export default function RegistrationLogIn() {
  const [email, setEmail] = useState("");
  const [pantherId, setPantherId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePantherIdChange = (e) => {
    setPantherId(e.target.value);
  };

  const handleSubmit = () => {
    const loginInfo = {
      "email": email,
      "password": pantherId,
    };
  
    axios.post("http://localhost:8008/authentication/login/", loginInfo, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Login successful");
          // Store CSRF token in local storage
          localStorage.setItem("csrfToken", response.data.csrf_token);
          window.location.href = "http://localhost:5173/newsfeed";
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
            type="text"
            className="input-field"
            placeholder="Panther ID"
            value={pantherId}
            onChange={handlePantherIdChange}
          />
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
          <button className="registration-button">
            Register Here
          </button>
        </Link>
      </div>
    </div>
  );
}
