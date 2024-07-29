import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import defaultProfilePicture from "../../assets/Default_pfp.png";
import "./profileEdit.css";
import { Link } from "react-router-dom";
import Search from './search'

const ProfileEdit = ({ classification = "Alum" }) => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    graduationYear: "",
    gradTerm: "",
    major: "",
    minor: "",
    careerInterest: "",
    aboutMe: "",
    profilePicture: null,
    resume: null,
    url: "",
    resumeURL: "",
    network: "",
  });

  const [experiences, setExperiences] = useState([
    {
      jobTitle: "",
      companyName: "",
      type: "",
      location:"",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
  ]);

  const [projects, setProjects] = useState([
    { projectName: "", description: "", projectSkills: [], skillsInput: "" },
  ]);

  const [extracurr, setExtracurr] = useState([
    { extracurrName: "", description: "" },
  ]);

  const [selectedMajor, setSelectedMajor] = useState(profile.major);

  const [skills, setSkills] = useState([]);
  const [skillsError, setSkillsError] = useState(false);

  const [url, setUrl] = useState(profile.url);
  const [urlError, setUrlError] = useState("");

  const [error, setError] = useState("");

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleGradBlur = (e) => {
    const { name, value } = e.target;
    if (name === "graduationYear") {
      validateGraduationYear(value);
    }
  };

  const validateGraduationYear = (value) => {
    if (value.trim() === "") {
      setError("");
    } else if (!/^\d{4}$/.test(value)) {
      setError("Please enter a valid four-digit year.");
    } else {
      setError("");
    }
  };

  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleMajorChange = (event) => {
    const value = event.target.value;
    setSelectedMajor(value);
    handleProfileChange(event);
  };

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const newExperiences = [...experiences];
    newExperiences[index][name] = value;
    setExperiences(newExperiences);
  };

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const newProjects = projects.slice();
    newProjects[index][name] = value;
    setProjects(newProjects);
  };

  const handleExtracurrChange = (index, e) => {
    const { name, value } = e.target;
    const newExtracurr = extracurr.slice();
    newExtracurr[index][name] = value;
    setExtracurr(newExtracurr);
  };

  const handleSkillChange = (e) => {
    const { value } = e.target;
    setSkills([...skills, value]);
    e.target.value = "";
  };

  const handleProjectSkillChange = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedValue = e.target.value.trim();
      if (trimmedValue !== "") {
        const newSkills = [...projects[index].projectSkills, trimmedValue];
        const newProjects = [...projects];
        newProjects[index].projectSkills = newSkills;
        newProjects[index].skillsInput = "";
        setProjects(newProjects);
        setSkillsError(false); // Reset skills error state
      } else {
        setSkillsError(true); // Set skills error state if trimmed value is empty
      }
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedValue = e.target.value.trim();
      if (trimmedValue !== "") {
        const newSkills = [...skills, trimmedValue];
        setSkills(newSkills);
        e.target.value = "";
      }
    }
  };

  const removeSkill = (projectIndex, skillIndex) => {
    const newSkills = [...projects[projectIndex].projectSkills];
    newSkills.splice(skillIndex, 1);
    const newProjects = [...projects];
    newProjects[projectIndex].projectSkills = newSkills;
    setProjects(newProjects);
  };

  const handleProfilePictureChange = (e) => {
    // Update the profile picture state when a new file is selected
    setProfile({ ...profile, profilePicture: e.target.files[0] });
  };

  const handleUrlChange = (e) => {
    setProfile({ ...profile, url: e.target.value });
  };

  const handleBlur = (e) => {
    const { value } = e.target;
    if (value.trim() === "") {
      setUrlError("");
    } else if (!value || !value.match(/^https?:\/\/.*/)) {
      setUrlError("Please enter a valid URL (e.g., https://example.com)");
    } else {
      setUrlError("");
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    const fileURL = URL.createObjectURL(file);
    setProfile({ ...profile, resume: file, resumeURL: fileURL });
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        jobTitle: "",
        companyName: "",
        type: "",
        location: "",
        startDate: "",
        endDate: "",
        current: "",
        description: "",
      },
    ]);
  };

  const addProject = () => {
    setProjects([
      ...projects,
      { projectName: "", description: "", projectSkills: [], skillsInput: "" },
    ]);
  };

  const addExtracurr = () => {
    setExtracurr([...extracurr, { extracurrName: "", description: "" }]);
  };

  const addSkill = () => {
    setSkills([...skills, { skillName: "" }]);
  };

  const handleOnSearchChange = (searchData) => {
    console.log('searchData:', searchData);
    
  }

  const nextStep = () => {
    const form = document.getElementById("profileForm");
    if (form.checkValidity()) {
      setCurrentStep(currentStep + 1);
    } else {
      form.reportValidity();
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    console.log("Form submitted");
    e.preventDefault();

    const form = document.getElementById("profileForm");
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const profileData = {
      profile,
      experiences: experiences.map((exp) => ({
        ...exp,
        endDate: exp.current ? null : exp.endDate,
      })),
      projects,
      skills,
    };

    console.log("It got here too");
    try {
      const response = await axios.post(
        "http://localhost:8000/profile/profile-edit/",
        profileData
      );
      if (response.status === 201) {
        console.log("Profile edit successful");
        navigate("/view-profile");
      } else {
        console.error("Profile edit failed");
      }
    } catch (error) {
      console.error("Error sending profile edit request:", error);
    }
  };

  return (
    <div className="profile-form">
      <form
        id="profileForm"
        className="profile-editing"
        onSubmit={handleSubmit}
      >
        <h2>Edit Profile</h2>
        {currentStep === 1 && (
          <>
            <div className="display-personal-info">
              <div className="profile-picture-container">
                {/* Display the profile picture */}
                <label htmlFor="profilePicture">Profile Picture</label>
                <img
                  src={
                    profile.profilePicture
                      ? URL.createObjectURL(profile.profilePicture)
                      : defaultProfilePicture
                  }
                  alt="Profile"
                  className="profile-picture"
                />
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleProfilePictureChange}
                />
                <label htmlFor="profilePicture" className="choose-image-button">
                  Choose Image
                </label>

                {classification === "Student" ? (
                  <>
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      style={{ display: "none" }}
                      onChange={handleResumeChange}
                    />
                    <div className="resume">
                      <label htmlFor="resume" className="choose-resume-button">
                        Upload Resume
                      </label>
                    </div>
                    {profile.resumeURL && (
                      <div className="upload-success-message">
                        <a
                          href={profile.resumeURL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Resume
                        </a>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="url-box">
                      <input
                        type="url"
                        id="url"
                        name="url"
                        value={profile.url}
                        onChange={handleUrlChange}
                        onBlur={handleBlur}
                        placeholder="Company URL"
                        required
                      />
                      {urlError && (
                        <div className="url-message">{urlError}</div>
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className="name-container">
                <label htmlFor="firstName">
                  First Name <div className="required-fields">*</div>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleProfileChange}
                  required
                />
                {/* {formErrors.firstNameError && (
                  <span className="error">{formErrors.firstNameError}</span>
                )} */}

                <label htmlFor="middleName">Middle Name </label>
                <input
                  type="text"
                  id="middleName"
                  name="middleName"
                  value={profile.middleName}
                  onChange={handleProfileChange}
                />
                <label htmlFor="lastName">
                  Last Name <div className="required-fields">*</div>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleProfileChange}
                  required
                />
              </div>
            </div>

            <label htmlFor="aboutMe">
              About Me <div className="required-fields">*</div>
            </label>
            <textarea
              id="aboutMe"
              placeholder="You can write about your years of experience, industry, or skills. People also talk about their achievements or previous job experiences."
              name="aboutMe"
              value={profile.aboutMe}
              onChange={handleProfileChange}
              required
            />

            <label htmlFor="graduationYear">
              Graduation Year <div className="required-fields">*</div>
            </label>
            <input
              type="text"
              id="graduationYear"
              name="graduationYear"
              value={profile.graduationYear}
              onChange={handleProfileChange}
              placeholder="Enter a four-digit value"
              onBlur={handleGradBlur}
              required
            />
            {error && <div className="grad-error">{error}</div>}

            <label htmlFor="gradTerm">
              Graduation Term <div className="required-fields">*</div>{" "}
            </label>
            <select
              id="gradTerm"
              value={profile.gradTerm}
              onChange={(e) =>
                setProfile({ ...profile, gradTerm: e.target.value })
              }
              required
            >
              <option value="">Choose one</option>
              <option value="option1">Spring</option>
              <option value="option2">Summer</option>
              <option value="option3">Fall</option>
            </select>

            {classification === "Student" && (
              <>
                <label htmlFor="major">
                  Major <div className="required-fields">*</div>
                </label>
                <select
                  id="major"
                  name="major"
                  value={selectedMajor}
                  onChange={handleMajorChange}
                  required
                >
                  <option value="">Choose one</option>
                  <option value="Art (BFA) - Graphic Design">
                    Art (BFA) - Graphic Design
                  </option>
                  <option value="Computer Engineering (BS)">
                    Computer Engineering (BS)
                  </option>
                  <option value="Computer Engineering (MS)">
                    Computer Engineering (MS)
                  </option>
                  <option value="Computer Science (BA)">
                    Computer Science (BA)
                  </option>
                  <option value="Computer Science (BS)">
                    Computer Science (BS)
                  </option>
                  <option value="Computer Science (MS)">
                    Computer Science (MS)
                  </option>
                  <option value="Computer Science (PhD)">
                    Computer Science (PhD)
                  </option>
                  <option value="Cybersecurity (MS)">Cybersecurity (MS)</option>
                  <option value="Cybersecurity Risk Management (MBA)">
                    Cybersecurity Risk Management (MBA)
                  </option>
                  <option value="Data Science (MS)">Data Science (MS)</option>
                  <option value="Electrical and Computer Engineering (PhD)">
                    Electrical and Computer Engineering (PhD)
                  </option>
                  <option value="Electrical Engineering (MS)">
                    Electrical Engineering (MS)
                  </option>
                  <option value="Engineering Management (MS)">
                    Engineering Management (MS)
                  </option>
                  <option value="Information Systems (MS)">
                    Information Systems (MS)
                  </option>
                  <option value="Information Technology (BA)">
                    Information Technology (BA)"
                  </option>
                  <option value="Information Technology (BS)">
                    Information Technology (BS)
                  </option>
                  <option value="Internet of Things (MS)">
                    Internet of Things (MS)
                  </option>
                  <option value="Management Information Systems (BBA)">
                    Management Information Systems (BBA)
                  </option>
                  <option value="Materials Science and Engineering (MS)">
                    Materials Science and Engineering (MS)
                  </option>
                  <option value="Materials Science and Engineering (PhD)">
                    Materials Science and Engineering (PhD)
                  </option>
                  <option value="Mechanical Engineering (MS)">
                    Mechanical Engineering (MS)
                  </option>
                  <option value="Mechanical Engineering (BS)">
                    Mechanical Engineering (BS)
                  </option>
                  <option value="Mechanical Engineering (PhD)">
                    Mechanical Engineering (PhD)
                  </option>
                  <option value="Telecommunications and Networking (MS)">
                    Telecommunications and Networking (MS)
                  </option>
                  <option value="Other">Other</option>
                </select>
                {selectedMajor === "Other" && (
                  <>
                    <label htmlFor="otherMajor"></label>
                    <input
                      type="text"
                      id="otherMajor"
                      name="otherMajor"
                      placeholder="Please specify your major"
                      value={profile.otherMajor || ""}
                      onChange={handleProfileChange}
                      required
                    />
                  </>
                )}
                <label htmlFor="minor">
                  Minor <div className="required-fields">*</div>
                </label>
                <input
                  type="text"
                  id="minor"
                  name="minor"
                  value={profile.minor}
                  onChange={handleProfileChange}
                  required
                />
                <label htmlFor="careerInterest">
                  Career Interest <div className="required-fields">*</div>
                </label>
                <input
                  type="text"
                  id="careerInterest"
                  name="careerInterest"
                  value={profile.careerInterest}
                  onChange={handleProfileChange}
                  required
                />
              </>
            )}
          </>
        )}

        {currentStep === 2 && (
          <>
            <h3>Experiences</h3>
            {experiences.map((experience, index) => (
              <div key={index} className="experience-section">
                <label htmlFor={`jobTitle-${index}`}>
                  Job Title <div className="required-fields">*</div>{" "}
                </label>
                <input
                  type="text"
                  id={`jobTitle-${index}`}
                  name="jobTitle"
                  value={experience.jobTitle}
                  onChange={(e) => handleExperienceChange(index, e)}
                  required
                />

                <label htmlFor={`companyName-${index}`}>
                  Company Name <div className="required-fields">*</div>
                </label>
                <input
                  type="text"
                  id={`companyName-${index}`}
                  name="companyName"
                  value={experience.companyName}
                  onChange={(e) => handleExperienceChange(index, e)}
                  required
                />

                <label htmlFor={`type-${index}`}>
                  Type <div className="required-fields">*</div>
                </label>
                <select
                  id={`type-${index}`}
                  name="type"
                  value={experience.type}
                  onChange={(e) => handleExperienceChange(index, e)}
                  required
                >
                  <option value="">Choose one</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Self-employed">Self-employed</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Apprenticeship">Apprenticeship</option>
                  <option value="Seasonal">Seasonal</option>
                  <option value="Other">Other</option>
                </select>
                {experience.type === "Other" && (
                  <input
                    type="text"
                    name="otherType"
                    placeholder="Specify other type"
                    value={experience.otherType}
                    onChange={(e) =>
                      handleExperienceChange(index, {
                        target: { name: "otherType", value: e.target.value },
                      })
                    }
                  />
                )}

                <label htmlFor={`location-${index}`}>Location</label>
                <Search onSearchChange={handleOnSearchChange}/>

                <label htmlFor={`startDate-${index}`}>
                  Start Date <div className="required-fields">*</div>
                </label>
                <input
                  type="date"
                  id={`startDate-${index}`}
                  name="startDate"
                  value={experience.startDate}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => handleExperienceChange(index, e)}
                  required
                />

                <label htmlFor={`endDate-${index}`}>End Date </label>
                <input
                  type="date"
                  id={`endDate-${index}`}
                  name="endDate"
                  value={experience.endDate}
                  onChange={(e) => handleExperienceChange(index, e)}
                  disabled={experience.current} // Disable end date if current is checked
                />

                <div className="experience-checkbox">
                  <input
                    type="checkbox"
                    name="current"
                    checked={experience.current}
                    onChange={() =>
                      handleExperienceChange(index, {
                        target: { name: "current", value: !experience.current },
                      })
                    }
                  />

                  <label className="checkbox-label">
                    {" "}
                    I'm currently in this position
                  </label>
                </div>

                <label htmlFor={`description-${index}`}>Description </label>
                <textarea
                  id={`description-${index}`}
                  name="description"
                  value={experience.description}
                  onChange={(e) => handleExperienceChange(index, e)}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addExperience}
              className="profile-editing-button"
            >
              Add More
            </button>

            {classification == "Student" && (
              <>
                <h3>Projects</h3>
                {projects.map((project, index) => (
                  <div key={index} className="project-section">
                    <label htmlFor={`projectName-${index}`}>
                      Project Name <div className="required-fields">*</div>
                    </label>
                    <input
                      type="text"
                      id={`projectName-${index}`}
                      name="projectName"
                      value={project.projectName}
                      onChange={(e) => handleProjectChange(index, e)}
                      required
                    />

                    <label htmlFor={`description-${index}`}>
                      Description <div className="required-fields">*</div>
                    </label>
                    <textarea
                      id={`description-${index}`}
                      name="description"
                      value={project.description}
                      onChange={(e) => handleProjectChange(index, e)}
                      required
                    />
                    <div className="required-fields">*</div>
                    <input
                      type="text"
                      id={`skillsInput-${index}`}
                      placeholder="Add a skill or technology you used in this project and press ENTER (e.g., Java)"
                      value={project.skillsInput}
                      required={project.projectSkills.length === 0} // if user types something and does not press enter, they are allowed to the next step; a bug to fix
                      onChange={(e) => {
                        const newProjects = [...projects];
                        newProjects[index].skillsInput = e.target.value;
                        setProjects(newProjects);
                      }}
                      onKeyDown={(e) => handleProjectSkillChange(e, index)}
                    />
                    <ul id={`skillsList-${index}`} className="skills-list">
                      {project.projectSkills.map((skill, skillIndex) => (
                        <li key={skillIndex} className="skills-item">
                          {skill}
                          <button
                            type="button"
                            className="remove-skill-button"
                            onClick={() => removeSkill(index, skillIndex)}
                          >
                            &times;
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addProject}
                  className="profile-editing-button"
                >
                  Add More
                </button>
              </>
            )}
          </>
        )}

        {currentStep === 3 && (
          <>
            {classification === "Student" && (
              <>
                <h3>Extracurricular Activities</h3>
                {extracurr.map((extracurrs, index) => (
                  <div key={index} className="extracurr-section">
                    <label htmlFor={`extracurrName-${index}`}>
                      Extracurricular Name{" "}
                    </label>
                    <input
                      type="text"
                      id={`extracurrName-${index}`}
                      name="extracurrName"
                      value={extracurrs.extracurrName}
                      onChange={(e) => handleExtracurrChange(index, e)}
                    />

                    <label htmlFor={`description-${index}`}>Description </label>
                    <textarea
                      id={`description-${index}`}
                      name="description"
                      value={extracurrs.description}
                      onChange={(e) => handleExtracurrChange(index, e)}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addExtracurr}
                  className="profile-editing-button"
                >
                  Add More
                </button>
              </>
            )}

            <h3>Add Skills</h3>
            <div className="skills-section">
              <input
                type="text"
                className="skills-list"
                placeholder="Add a skill and press ENTER (e.g., Java)"
                onKeyDown={handleKeyDown}
              />
              <ul className="skills-list">
                {skills.map((skill, index) => (
                  <li key={index} className="skills-item">
                    {skill}
                    <button
                      type="button"
                      className="remove-skill-button"
                      onClick={() => removeSkill(index)}
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <h3>Networking</h3>
            <div className="networking-section">
              <label htmlFor="network">
                Open to <div className="required-fields">*</div>{" "}
              </label>
              <select
                id="network"
                value={profile.network}
                onChange={(e) =>
                  setProfile({ ...profile, network: e.target.value })
                }
                required
              >
                <option value="">Choose One</option>
                <option value="Open to Hire">Open to Hire</option>
                <option value="Open to Internship">Open to Internship</option>
                <option value="Open to Job">Open to Job</option>
                <option value="Open to Connect">Open to Connect</option>
              </select>
            </div>
          </>
        )}

        <div className="button-container">
          {currentStep > 1 && (
            <>
              <button
                type="button"
                onClick={prevStep}
                className="profile-editing-back"
              >
                Previous
              </button>
            </>
          )}
          {currentStep < 3 && (
            <>
              <button
                type="button"
                onClick={nextStep}
                className="profile-editing-next"
              >
                Next
              </button>
            </>
          )}
        </div>

        {currentStep == 3 && (
          <>
            <div className="Edit-Profile-Button">
              <button onSubmit={handleSubmit} className="edit-profile-submit">
                Save{" "}
              </button>
              {/* <Link to="/view-profile" className="edit-profile-button">
              </Link> */}
            </div>
          </> // save will only redirect to the view profile page if backend recieved information correctly
        )}
      </form>
    </div>
  );
};

export default ProfileEdit;
