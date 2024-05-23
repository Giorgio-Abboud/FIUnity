// import { useState } from "react";
// import "./regist-App.css";
// import FormInput from "./FormInput";
// import axios from "axios";

// const Registration = () => {
//   const [values, setValues] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     pid: "",
//     password: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:8000/authentication/register/", values);
//       console.log("Registration successful:", response.data);
//       // Redirect to a success page or handle success message
//     } catch (error) {
//       console.error("Registration failed:", error);
//       if (error.response && error.response.data) {
//         const responseData = error.response.data;
//         if (responseData.PID && responseData.PID.length > 0) {
//           // Display error message related to Panther ID
//           console.error("Panther ID error:", responseData.PID[0]);
//         } else {
//           // Display a general error message
//           console.error("Server error:", responseData);
//         }
//       }
//     }
//   };
  
//   const handleChange = (e) => {
//     setValues({ ...values, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="registration-formatting">
//       <form onSubmit={handleSubmit} className="Registration-container">
//         <h1 className="Registration-title">Register</h1>
//         <FormInput
//           name="firstName"
//           type="text"
//           placeholder="First Name"
//           value={values.firstName}
//           onChange={handleChange}
//           required
//         />
//         <FormInput
//           name="lastName"
//           type="text"
//           placeholder="Last Name"
//           value={values.lastName}
//           onChange={handleChange}
//           required
//         />
//         <FormInput
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={values.email}
//           onChange={handleChange}
//           required
//         />
//         <FormInput
//           name="pid"
//           type="text"
//           placeholder="Panther ID"
//           value={values.pid}
//           onChange={handleChange}
//           pattern="\d{7}"
//           title="A valid Panther ID should be a 7-digit number."
//           required
//         />
//         <FormInput
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={values.password}
//           onChange={handleChange}
//           required
//         />
//         <div className="registration-submit-button">
//           <button type="submit" className="RegistrationSubmitButton">Register</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Registration;


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
        window.location.href = "http://localhost:5173/test";
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
        

        <Link to="/test">
        <button className="submit-button" onClick={handleSubmit}>
          Submit</button>        
          </Link>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}
