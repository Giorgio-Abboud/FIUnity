import React, { useState, useEffect } from "react";
import axios from "axios";
import "./jobs.css";
import { Link } from "react-router-dom";

const getTypeLabel = (type) => {
  switch (type) {
    case "option1":
      return "Internship";
    case "option2":
      return "Part-Time";
    case "option3":
      return "Full-Time";
    default:
      return type;
  }
};

const getModeLabel = (mode) => {
  switch (mode) {
    case "option1":
      return "In-Person";
    case "option2":
      return "Hybrid";
    case "option3":
      return "Remote";
    default:
      return mode;
  }
};

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    // Fetch job posting data from your backend with authorization header
    axios
      .get("http://localhost:8000/jobs/job-posting/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Replace `accessToken` with your actual token variable
        },
      })
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []);

  const handleJobClick = (jobPosition) => {
    // Fetch job posting details for the selected job with authorization header
    axios
      .get(`http://localhost:8000/jobs/job-posting/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Replace `accessToken` with your actual token variable
        },
      })
      .then((response) => {
        console.log("response data", response.data);
        const selectedJobIndex = jobs.findIndex(
          (job) => job.jobPosition === jobPosition
        );
        if (selectedJobIndex !== -1) {
          // If the selected job is found, update the selectedJob state with the corresponding job
          setSelectedJob(jobs[selectedJobIndex]);
        } else {
          console.error("Error: Selected job not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching job details:", error);
      });
  };

  return (
    <>
      <div className="post-button-container">
        <Link to="/job-posting">
          <button className="post-job-button">Post a Job</button>
        </Link>
      </div>
      <div className="job-list-container">
        <div className="job-list">
          <h2>Job Postings</h2>
          <ul>
            {jobs.map((job) => (
              <li
                key={job.jobPosition}
                onClick={() => handleJobClick(job.jobPosition)}
              >
                {job.jobPosition} - {job.companyName}
              </li>
            ))}
          </ul>
        </div>
        {selectedJob && (
          <div className="job-details">
            <div>
              <h3>{selectedJob.jobPosition}</h3>
              {selectedJob.jobId && <p>Job ID: {selectedJob.jobId}</p>}
              <p className="company-name-heading">{selectedJob.companyName}</p>
              {selectedJob.jobDescription && (
                <div text-m>
                  <h4>Description</h4>
                  <p className="text-margin">{selectedJob.jobDescription}</p>
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="Jobs-svg"
                >
                  <rect
                    x="4"
                    y="8"
                    width="24"
                    height="16"
                    rx="2"
                    stroke="#0C3D72"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 12H10.6667"
                    stroke="#0C3D72"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M21.333 20H23.9997"
                    stroke="#0C3D72"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="3"
                    stroke="#0C3D72"
                    strokeWidth="2"
                  />
                </svg>
                <p>{selectedJob.salary}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="Jobs-svg"
                >
                  <g clip-path="url(#clip0_52_145)">
                    <path
                      d="M13.9641 22.1786H0.821289V6.57141L7.39272 0.821411L13.9641 6.57141V22.1786Z"
                      stroke="#0C3D72"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.9639 22.1785H22.1782V10.6785H13.9639"
                      stroke="#0C3D72"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7.39258 22.1785V18.8928"
                      stroke="#0C3D72"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4.92871 13.9643H9.85728"
                      stroke="#0C3D72"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4.92871 9.03571H9.85728"
                      stroke="#0C3D72"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_52_145">
                      <rect width="23" height="23" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p>{getTypeLabel(selectedJob.type)}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="Jobs-svg"
                >
                  <g clip-path="url(#clip0_52_140)">
                    <path
                      d="M18.8931 8.21427C18.8931 13.1428 11.5003 18.8928 11.5003 18.8928C11.5003 18.8928 4.10742 13.1428 4.10742 8.21427C4.10742 4.18763 7.47364 0.821411 11.5003 0.821411C15.5269 0.821411 18.8931 4.18763 18.8931 8.21427Z"
                      stroke="#0C3D72"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.4994 10.6786C12.8604 10.6786 13.9637 9.57528 13.9637 8.21429C13.9637 6.85329 12.8604 5.75 11.4994 5.75C10.1384 5.75 9.03516 6.85329 9.03516 8.21429C9.03516 9.57528 10.1384 10.6786 11.4994 10.6786Z"
                      stroke="#0C3D72"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M18.1983 16.4285H19.7141L22.1784 22.1785H0.821289L3.28557 16.4285H4.80144"
                      stroke="#0C3D72"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_52_140">
                      <rect width="23" height="23" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p>{getModeLabel(selectedJob.mode)}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="Jobs-svg"
                >
                  <rect
                    x="3"
                    y="6"
                    width="18"
                    height="15"
                    rx="2"
                    stroke="#0C3D72"
                    stroke-width="2"
                  />
                  <path
                    d="M4 11H20"
                    stroke="#0C3D72"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M9 16H15"
                    stroke="#0C3D72"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M8 3L8 7"
                    stroke="#0C3D72"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M16 3L16 7"
                    stroke="#0C3D72"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>

                <p>Start Date: {selectedJob.startDate}</p>
                {selectedJob.endDate && (
                  <p style={{ marginLeft: "1rem" }}>
                    End Date: {selectedJob.endDate}
                  </p>
                )}
              </div>
              {selectedJob.otherRequirements && (
                <div className="separation-margin">
                  <h4>Other Requirements</h4>
                  <p className="text-margin">{selectedJob.otherRequirements}</p>
                </div>
              )}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0px",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="Jobs-svg"
                  >
                    <rect
                      x="6.45801"
                      y="5.16669"
                      width="18.0833"
                      height="21.9583"
                      rx="2"
                      stroke="#0C3D72"
                      stroke-width="2"
                    />
                    <path
                      d="M11.625 11.625H19.375"
                      stroke="#0C3D72"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M11.625 16.7917H19.375"
                      stroke="#0C3D72"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M11.625 21.9583H16.7917"
                      stroke="#0C3D72"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                  <p style={{ marginTop: "2rem" }}>
                    US Work Authorization Required:{" "}
                    {selectedJob.usWorkAuthorization ? "Yes" : "No"}
                  </p>
                </div>

                <p style={{ marginLeft: "2.2rem" }}>
                  US Citizenship Required:{" "}
                  {selectedJob.usCitizenship ? "Yes" : "No"}
                </p>
                <p style={{ marginLeft: "2.2rem", marginBottom: "1.7rem" }}>
                  US Residency Required:{" "}
                  {selectedJob.usResidency ? "Yes" : "No"}
                </p>
              </div>
              <div className="flex-job">
                <p>Posted by:</p>
                <p className="posted-on">{selectedJob.full_name},</p>
                <p className="job-gold">{selectedJob.status}</p>
              </div>
            </div>
            <div className="flex-job">
              <p>Created on:</p>
              <p className="posted-on">
                {selectedJob.created_at
                  ? new Date(selectedJob.created_at).toLocaleDateString()
                  : "Unknown"}
              </p>
            </div>
            <p className="separation-margin">
              <a href={selectedJob.applicationLink}>
                <button>Apply</button>
              </a>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default JobsList;
