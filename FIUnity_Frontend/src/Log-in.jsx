import React, { useState } from "react";
import "./Log-in.css";


export default function RegistrationLogIn() {
    const [email, setEmail] = useState("");
    const [pantherId, setPantherId] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePantherIdChange = (e) => {
        setPantherId(e.target.value);
    };

    const handleSubmit = () => {
        // Create an object with the login information
        const loginInfo = {
            email: email,
            pantherId: pantherId
        };
    
        // Send a POST request to the backend with the login information as JSON
        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginInfo)
        })
        .then(response => {
            if (response.ok) {
                console.log("Login successful");
                // Here we can redirect the user to home page
            } else {
                console.error("Login failed");
            }
        })
        .catch(error => {
            console.error("Error sending login request:", error);
        });
    };

    return (
        <div className="registration-log-in">
            <div className="login-title">
                Login
            </div>
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
            </div>
        </div>
    );
};
