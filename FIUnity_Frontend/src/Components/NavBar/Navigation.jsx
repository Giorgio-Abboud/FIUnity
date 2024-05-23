import React from "react";
import NavBar from "./NavBar";
import CreateJob from "../JobsPosting/job-posting-App";
import ViewJobs from "../Jobs/jobs-App";
import Homepage from "../Homepage/Homepage";
import FinalPost from "../Homepage/FinalPost";
import CreatePost from "../Homepage/CreatePost";
import RegistrationLogIn from "../Login Page/Log-in";
import Registration from "../Registration/regist-App";
import { Route, Routes, useLocation } from "react-router-dom";


const Navigation = () => {
  const location = useLocation();

  const showNavBar =
    location.pathname !== "/logout" && location.pathname !== "/register";

  return (
    <>
      {showNavBar && <NavBar />}
      <div className="container">
        <Routes>
          <Route path="/newsfeed" element={<Homepage />} />
          <Route path="/create-job" element={<CreateJob />} />
          <Route path="/jobs-list" element={<ViewJobs />} />
          <Route path="/final-post" element={<FinalPost />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/logout" element={<RegistrationLogIn />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/register-submit" element={<Homepage />} />
          <Route path="/login-submit" element={<Homepage />} />
        </Routes>
      </div>
    </>
  );
};

export default Navigation;
