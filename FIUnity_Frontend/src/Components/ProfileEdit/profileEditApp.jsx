import React, { useState, useEffect } from "react";
// import "./profileEdit-App.css";
import ProfileEdit from "./profileEdit";
import axios from 'axios';

function ProfileEditing() {
  const [classification, setClassification] = useState(null);

  useEffect(() => {
    const fetchClassification = async () => {
      try {
        const response = await axios.get("http://localhost:8000/profile/mainpage/", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        setClassification(response.data.profile.check_graduation_status); 
      } catch (error) {
        console.error("Error fetching classification:", error);
      }
    };

    fetchClassification();
  }, []);

  return (
    <>
      <div>
        <ProfileEdit classification={classification} />
      </div>
    </>
  );
}

export default ProfileEditing;
