import React from "react";
import NavBar from "./NavBar";
import CreateJob from "../JobsPosting/job-posting-App";
import ViewJobs from "../Jobs/jobs-App";
import Homepage from "../Homepage/Homepage";
import FormInput from "../Registration/FormInput";
import FinalPost from "../Homepage/FinalPost";
import CreatePost from "../Homepage/CreatePost";
import { Route, Routes } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <NavBar></NavBar>
      <div className="container">
        <Routes>
          <Route path="/newsfeed" element={<Homepage />}></Route>
          <Route path="/create-job" element={<CreateJob />}></Route>
          <Route path="/jobs-list" element={<ViewJobs />}></Route>
          <Route path="/form-input" element={<FormInput />}></Route>
          <Route path="/final-post" element={<FinalPost />}></Route>
          <Route path="/create-post" element={<CreatePost />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default Navigation;
