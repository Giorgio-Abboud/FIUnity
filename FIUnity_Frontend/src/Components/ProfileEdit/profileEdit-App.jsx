import { useState } from "react";
import "./profileEdit-App.css";
import ProfileEdit from "./profileEdit";
import ProfileEditAlumni from "./profileEditAlumni";

function ProfileEditing() {
  return (
    <>
      <div>
        <ProfileEdit classification="Student" />
        {/* <ProfileEditAlumni /> */}
      </div>
    </>
  );
}

export default ProfileEditing;
