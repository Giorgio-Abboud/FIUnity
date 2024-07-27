import axios from "./axiosInstance";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./regist-App.css";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pantherID, setPantherID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [gradTerm, setGradTerm] = useState("");
  const [gradYear, setGradYear] = useState("");


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handlePantherIDChange = (e) => {
    setPantherID(e.target.value);
  };

  const handleGradTermChange = (e) => {
    setGradTerm(e.target.value);
  };

  const handleGradYearChange = (e) => {
    setGradYear(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registerInfo = {
      first_name: firstName,
      last_name: lastName,
      PID: pantherID,
      email: email,
      password: password,
      grad_term: gradTerm,
      grad_year: gradYear,
    };

    try {
      const response = await axios.post("/authentication/register/", registerInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        console.log("Register successful");
        // Store CSRF token and user_id in local storage
        localStorage.setItem("csrfToken", response.data.token);
        localStorage.setItem("user_id", response.data.user_id);
        window.location.href = "http://localhost:5173/register-submit";
      } else {
        console.error("Register failed");
        setErrorMessage("Register failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error sending login request:", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.detail || "An error occurred while registering. Please try again later.");
      }
    }
  };

  return (
    <div className="registration-log-in">
      <div className="login-title">Register</div>
      <div className="input-container">
        <div className="input-wrapper">
          <input
            type="text"
            className="input-field"
            placeholder="First Name"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            className="input-field"
            placeholder="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            className="input-field"
            placeholder="Panther ID"
            value={pantherID}
            onChange={handlePantherIDChange}
          />
        </div>

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
            placeholder="Graduation Term"
            value={gradTerm}
            onChange={handleGradTermChange}
          />
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            className="input-field"
            placeholder="Graduation Year"
            value={gradYear}
            onChange={handleGradYearChange}
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
        </div>
        

        <Link to="/register-submit">
        <button className="submit-button" onClick={handleSubmit}>
          Submit</button>        
          </Link>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}
