import { useState, useEffect } from "react";
import "./regist-App.css";
import FormInput from "./FormInput";
import axios from "axios";
import { Link } from "react-router-dom";

const Registration = () => {
  const [values, setValues] = useState({
    //firstName: "",
    //lastName: "",
    email: "",
    pid: "",
    password: "",
  });

  const inputs = [
    // {
    //   id: 1,
    //   name: "firstName",
    //   type: "text",
    //   placeholder: "First Name",
    //   errorMessage:
    //     "Firstname should be 3-16 characters and shouldn't include any special character!",
    //   label: "First Name",
    //   pattern: "^[A-Za-z0-9]{3,16}$",
    //   required: true,
    // },
    // {
    //   id: 2,
    //   name: "lastName",
    //   type: "text",
    //   placeholder: "Last Name",
    //   errorMessage:
    //     "Lastname should be 3-16 characters and shouldn't include any special character!",
    //   label: "Last Name",
    //   pattern: "^[A-Za-z0-9]{3,16}$",
    //   required: true,
    // },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "pid",
      type: "text",
      placeholder: "PID",
      label: "PID",
      required: true,
    },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("handleSubmit function called"); // Add this line to check if handleSubmit is called
    // console.log("Form values: ", values);
    try {
      const response = await axios.post("http://localhost:8008/authentication/register", values);
      console.log("Registration successful:", response.data);
      // Redirect to a success page or handle success message
    } catch (error) {
      console.error("Registration failed:", error);
      // Display error message to the user
    }


  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="registration-formatting">
      <form onSubmit={handleSubmit} className="Registration-container">
        <h1 className="Registration-title">Register</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}

        <div className="registration-submit-button">
          <Link to="/register-submit" className="Register-text">
            <button type="submit" className="RegistrationSubmitButton">Register</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Registration;
