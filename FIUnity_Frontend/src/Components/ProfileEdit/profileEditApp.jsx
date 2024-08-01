import React, { useState, useEffect } from "react";
// import "./profileEdit-App.css";
import ProfileEdit from "./profileEdit";
import axios from 'axios';

function ProfileEditing() {
  const [classification, setClassification] = useState(null);

  useEffect(() => {
    console.log(
      'got here'
    )
    const fetchClassification = async () => {
      try {
        const response = await axios.get("http://localhost:8000/profile/mainpage/", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        console.log('response', response.profile.check_graduation_status)
        setClassification(response.profile.check_graduation_status); // Adjust based on your API response
      } catch (error) {
        console.error("Error fetching classification:", error);
      }
    };

    fetchClassification();
  }, []);

  return (
    <>
      <div>
        <ProfileEdit classification={"Student"} />
      </div>
    </>
  );
}

export default ProfileEditing;
