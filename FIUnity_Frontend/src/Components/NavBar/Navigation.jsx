import React from "react";
import NavBar from "./NavBar";
import CreateJob from "../JobsPosting/job-posting-App";
import ViewJobs from "../Jobs/jobs-App";
import Homepage from "../Homepage/Homepage";
import FinalPost from "../Homepage/FinalPost";
import CreatePost from "../Homepage/CreatePost";
import RegistrationLogIn from "../Login Page/Log-in";
import Registration from "../Registration/regist-App";
import ProfileEditApp from "../ProfileEdit/profileEditApp";
import ProfileViewApp from "../Profile/ProfileViewApp";
import SearchResultApp from "../NavBar/Search Result/SearchResultApp";
import { Route, Routes, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  const showNavBar =
    location.pathname !== "/logout" &&
    location.pathname !== "/authentication/register" &&
    location.pathname !== "/register-submit" &&
    location.pathname !== "/test" &&
    location.pathname !== "/register-submit" &&
    location.pathname !== "/";

  return (
    <>
      {showNavBar && <NavBar />}
      <div className="container">
        <Routes>
          <Route path="/newsfeed" element={<Homepage />} />
          <Route path="/job-posting" element={<CreateJob />} />
          <Route path="/jobs-list" element={<ViewJobs />} />
          <Route path="/final-post" element={<FinalPost />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/logout" element={<RegistrationLogIn />} />
          <Route path="/authentication/register" element={<Registration />} />
          <Route path="/register-submit" element={<RegistrationLogIn />} />
          <Route path="/login-submit" element={<Homepage />} />
          <Route path="/test" element={<RegistrationLogIn />} />
          <Route path="/profile-edit" element={<ProfileEditApp />} />
          <Route path="/view-profile" element={<ProfileViewApp />} />
          <Route path="/profile/usermainpage/:userId" element={<ProfileViewApp />} />
          <Route path="/search-result" element={<SearchResultApp />} />
          <Route path="/" element={<RegistrationLogIn />} />
          <Route path="/post-job" element={<ViewJobs />} />
        </Routes>
      </div>
    </>
  );
};

export default Navigation;
