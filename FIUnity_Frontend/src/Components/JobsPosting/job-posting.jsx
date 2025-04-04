import React, { useState } from "react";
import "./job-posting.css";
import { useNavigate } from "react-router-dom";
import axios, { isCancel, AxiosError } from "axios";

const JobAddingPosting = () => {
  const [jobPosition, setJobPosition] = useState("");
  const [jobID, setJobID] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [type, setType] = useState("");
  const [mode, setMode] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [otherRequirements, setOtherRequirements] = useState("");
  const [usWorkAuthorization, setUsWorkAuthorization] = useState(false);
  const [usCitizenship, setUsCitizenship] = useState(false);
  const [usResidency, setUsResidency] = useState(false);
  const [applicationLink, setApplicationLink] = useState("");
  const formattedEndDate = endDate.trim() === "" ? null : endDate;
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log("Form submitted");
    e.preventDefault();

    // Create an object with the job posting information
    const jobPostingData = {
      jobPosition,
      jobID,
      companyName,
      jobDescription,
      salary,
      type,
      mode,
      startDate,
      endDate: formattedEndDate,
      otherRequirements,
      usWorkAuthorization,
      usCitizenship,
      usResidency,
      applicationLink,
    };

    console.log("job posting data", jobPostingData);
    // Send a POST request to the backend with the job posting information as JSON
    try {
      const response = await axios.post(
        "http://localhost:8000/jobs/job-posting/",
        jobPostingData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
            // Add any other headers you might need
          },
        }
      );
    
      if (response.status === 201) {
        console.log("Job posting successful");
        navigate("/jobs-list");
        console.log("response", response);
      } else {
        console.error("Job posting failed");
      }
    } catch (error) {
      console.error("Error sending job posting request:", error);
    }    
  };

  return (
    <>
      <div className="form">
        <form className="job-posting" onSubmit={handleSubmit}>
          <h2>Post a Job to the Community</h2>
          <label htmlFor="jobPosition">
            Job Position: <div className="required-jobs">*</div>
          </label>
          <input
            type="text"
            id="jobPosition"
            value={jobPosition}
            onChange={(e) => setJobPosition(e.target.value)}
            required
          />

          <label htmlFor="jobID">Job ID:</label>
          <input
            type="text"
            id="jobID"
            value={jobID}
            onChange={(e) => setJobID(e.target.value)}
          />

          <label htmlFor="companyName">
            Company name: <div className="required-jobs">*</div>
          </label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />

          <label htmlFor="jobDescription">Description:</label>
          <textarea
          className="description-job"
            type="text"
            id="jobDescription"
            value={jobDescription}
            placeholder="Type here..."
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <label htmlFor="salary">
            Salary: <div className="required-jobs">*</div>
          </label>
          <input
            type="text"
            id="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />

          <label htmlFor="type">
            Type: <div className="required-jobs">*</div>
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Choose one</option>
            <option value="Internship">Internship</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Full-Time">Full-Time</option>
          </select>

          <label htmlFor="mode">
            Mode: <div className="required-jobs">*</div>
          </label>
          <select
            id="mode"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            required
          >
            <option value="">Choose one</option>
            <option value="In-Person">In-Person</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
          </select>

          <div className="date-picker">
            <label htmlFor="startDate">
              Start Date: <div className="required-jobs">*</div>
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={today}
              required
            />
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              min={today}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <label htmlFor="otherRequirements">Other requirements:</label>
          <textarea
          className="requirements-job"
            id="otherRequirements"
            value={otherRequirements}
            placeholder="Type here..."
            onChange={(e) => setOtherRequirements(e.target.value)}
          />

          <label htmlFor="usWorkAuthorization">
            US Work Authorization Required:{" "}
            <div className="required-jobs">*</div>
          </label>
          <div className="radio-container">
            <input
              type="radio"
              id="usWorkAuthorizationYes"
              name="usWorkAuthorization"
              value="true"
              checked={usWorkAuthorization === true}
              onChange={() => setUsWorkAuthorization(true)}
              required
            />
            <label htmlFor="usWorkAuthorizationYes">Yes</label>

            <input
              type="radio"
              id="usWorkAuthorizationNo"
              name="usWorkAuthorization"
              value="false"
              checked={usWorkAuthorization === false}
              onChange={() => setUsWorkAuthorization(false)}
              required
            />
            <label htmlFor="usWorkAuthorizationNo">No</label>
          </div>

          <label htmlFor="usCitizenship">
            US Citizenship Required: <div className="required-jobs">*</div>
          </label>
          <div className="radio-container">
            <input
              type="radio"
              id="usCitizenshipYes"
              name="usCitizenship"
              value="true"
              checked={usCitizenship === true}
              onChange={() => setUsCitizenship(true)}
              required
            />
            <label htmlFor="usCitizenshipYes">Yes</label>

            <input
              type="radio"
              id="usCitizenshipNo"
              name="usCitizenship"
              value="false"
              checked={usCitizenship === false}
              onChange={() => setUsCitizenship(false)}
              required
            />
            <label htmlFor="usCitizenshipNo">No</label>
          </div>

          <label htmlFor="usResidency">
            US Residency Required: <div className="required-jobs">*</div>
          </label>
          <div className="radio-container">
            <input
              type="radio"
              id="usResidencyYes"
              name="usResidency"
              value="true"
              checked={usResidency === true}
              onChange={() => setUsResidency(true)}
              required
            />
            <label htmlFor="usResidencyYes">Yes</label>

            <input
              type="radio"
              id="usResidencyNo"
              name="usResidency"
              value="false"
              checked={usResidency === false}
              onChange={() => setUsResidency(false)}
              required
            />
            <label htmlFor="usResidencyNo">No</label>
          </div>

          <label htmlFor="applicationLink">
            Application Link: <div className="required-jobs">*</div>
          </label>
          <input
            type="text"
            id="applicationLink"
            value={applicationLink}
            placeholder="Type here..."
            onChange={(e) => setApplicationLink(e.target.value)}
            required
          />

          <button type="submit">Post</button>
        </form>
      </div>
    </>
  );
};

export default JobAddingPosting;
