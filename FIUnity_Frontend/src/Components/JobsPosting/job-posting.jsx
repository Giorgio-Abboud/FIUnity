import React, { useState } from 'react';
import "./job-posting.css";
import axios, { isCancel, AxiosError } from 'axios';



const JobAddingPosting = () => {
    const [jobPosition, setJobPosition] = useState('');
    const [jobID, setJobID] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [salary, setSalary] = useState('');
    const [type, setType] = useState('');
    const [mode, setMode] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [otherRequirements, setOtherRequirements] = useState('');
    const [usWorkAuthorization, setUsWorkAuthorization] = useState(false);
    const [usCitizenship, setUsCitizenship] = useState(false);
    const [usResidency, setUsResidency] = useState(false);
    const [applicationLink, setApplicationLink] = useState('');
    //const [isPosted, setIsPosted] = useState(false);
    //const [redirectUrl, setRedirectUrl] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const handleSubmit = (e) => {
        console.log('Form submitted'); 
        e.preventDefault();

        console.log('All fields:', { jobPosition, companyName, salary, type, mode, startDate, usWorkAuthorization, usCitizenship, usResidency, applicationLink });

        if (!jobPosition || !companyName || !salary || !type || !mode || !startDate || !usWorkAuthorization
            || !usCitizenship || !usResidency || !applicationLink) {
            setIsError(true);
            setErrorMessage("Please fill out all required fields.");
            return;
        }

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
            endDate,
            otherRequirements,
            usWorkAuthorization,
            usCitizenship,
            usResidency,
            applicationLink
        };

        // Send a POST request to the backend with the job posting information as JSON



        axios.post("http://localhost:8000/jobs/job-posting/", jobPostingData)
            .then(response => {
                if (response.status === 201) {
                    console.log("Job posting successful");
                } else {
                    console.error("Job posting failed");
                }
            })
            .catch(error => {
                console.log("There was an error");
                console.error("Error sending job posting request:", error);
            });

            

    };

    //isPosted ? <Redirect to={redirectUrl} /> : 

    return(
        <>
            <div className="form">
                <form className="job-posting" onSubmit={handleSubmit}>
                    <h2>Post a Job to the Community</h2>
                    <label htmlFor="jobPosition">Job Position: <div className="required-jobs">*</div></label>
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

                    <label htmlFor="companyName">Company name: <div className="required-jobs">*</div></label>
                    <input
                        type="text"
                        id="companyName"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                    />

                    <label htmlFor="jobDescription">Description:</label>
                    <input
                        type="text"
                        id="jobDescription"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                    />

                    <label htmlFor="salary">Salary: <div className="required-jobs">*</div></label>
                    <input
                        type="text"
                        id="salary"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        required
                    />

                    <label htmlFor="type">Type: <div className="required-jobs">*</div></label>
                    <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    >
                        <option value="">Choose one</option>
                        <option value="option1">Internship</option>
                        <option value="option2">Part-Time</option>
                        <option value="option3">Full-Time</option>
                    </select>

                    <label htmlFor="mode">Mode: <div className="required-jobs">*</div></label>
                    <select
                        id="mode"
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        required
                    >
                        <option value="">Choose one</option>
                        <option value="option1">In-Person</option>
                        <option value="option2">Hybrid</option>
                        <option value="option3">Remote</option>
                    </select>

                    <div className="date-picker">
                        <label htmlFor="startDate">Start Date: <div className="required-jobs">*</div></label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                        <label htmlFor="endDate">End Date:</label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>


                    <label htmlFor="otherRequirements">Other requirements:</label>
                    <textarea
                        id="otherRequirements"
                        value={otherRequirements}
                        placeholder="Type here..."
                        onChange={(e) => setOtherRequirements(e.target.value)}
                    />

                    <label htmlFor="usWorkAuthorization">US Work Authorization Required: <div className="required-jobs">*</div></label>
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

                    <label htmlFor="usCitizenship">US Citizenship Required: <div className="required-jobs">*</div></label>
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

                    <label htmlFor="usResidency">US Residency Required: <div className="required-jobs">*</div></label>
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

                    <label htmlFor="applicationLink">Application Link: <div className="required-jobs">*</div></label>
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
