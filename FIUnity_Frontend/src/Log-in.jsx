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
    
    
        axios.post('http://10.108.229.73:8000/login/', loginInfo, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                console.log('Login successful');
                // Redirect the user to the home page
                window.location.href = 'http://10.108.229.73:8000/homepage/';
            } else {
                console.error('Login failed');
                setErrorMessage('Login failed. Please check your credentials.');
            }
        })
        .catch(error => {
            console.error('Error sending login request:', error);
            setErrorMessage('An error occurred while logging in. Please try again later.');
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
