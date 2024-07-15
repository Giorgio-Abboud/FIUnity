import { useState } from "react";
import "./profileEdit-App.css";
import ProfileEdit from "./profileEdit";

function ProfileEditing() {
  return (
    <>
      <div>
        <ProfileEdit classification="Student" />
      </div>
    </>
  );
}

export default ProfileEditing;
