import React, { useState } from "react";
import axios from "axios";
import defaultProfilePicture from "../../assets/Default_pfp.png";
import "./profileEdit.css";
import { Link } from "react-router-dom";

const ProfileEditAlumni = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    graduationYear: "",
    gradTerm: "",
    current_job_position: "",
    aboutMe: "",
    profilePicture: null,
  });

  const [experiences, setExperiences] = useState([
    {
      jobPosition: "",
      companyName: "",
      type: "",
      location: "",
      startDate: "",
      endDate: "",
      // current: "",
      current: false,
      description: "",
    },
  ]);

  const [skills, setSkills] = useState([{ skillName: "", proficiency: "" }]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleExperienceChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const newExperiences = experiences.slice();
    if (type === "checkbox") {
      newExperiences[index][name] = checked;
    } else {
      newExperiences[index][name] = value;
    }
    setExperiences(newExperiences);
  };

  const handleSkillChange = (index, e) => {
    const { name, value } = e.target;
    const newSkills = skills.slice();
    newSkills[index][name] = value;
    setSkills(newSkills);
  };

  const handleProfilePictureChange = (e) => {
    // Update the profile picture state when a new file is selected
    setProfile({ ...profile, profilePicture: e.target.files[0] });
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        jobPosition: "",
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

  const addSkill = () => {
    setSkills([...skills, { skillName: "", proficiency: "" }]);
  };

  const handleSubmit = async (e) => {
    console.log("Form submitted");
    e.preventDefault();

    console.log("It got here");
    // Create the data object to send
    // const profileData = {
    //   profile,
    //   experiences,
    //   skills,
    // };

    const profileData = {
      profile,
      experiences: experiences.map(exp => ({
        ...exp,
        endDate: exp.current ? null : exp.endDate  // Set endDate to null if current
      })),
      skills,
    };

    console.log("It got here too");
    try {
      const response = await axios.post(
        "http://localhost:8008/profile/profile-edit-alumni/",
        profileData
      );
      if (response.status === 201) {
        console.log("Profile edit successful");
      } else {
        console.error("Profile edit failed");
      }
    } catch (error) {
      console.error("Error sending profile edit request:", error);
    }
  };

  return (
    <div className="profile-form">
      <form className="profile-editing" onSubmit={handleSubmit}>
        <h2>Edit Profile</h2>
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

        <label htmlFor="graduationYear">
          Graduation Year <div className="required-fields">*</div>
        </label>
        <input
          type="text"
          id="graduationYear"
          name="graduationYear"
          value={profile.graduationYear}
          onChange={handleProfileChange}
          required
        />

        <label htmlFor="gradTerm">
          Graduation Term <div className="required-fields">*</div>{" "}
        </label>
        <select
          id="gradTerm"
          value={profile.gradTerm}
          // onChange={(e) => setType(e.target.value)}
          onChange={(e) => setProfile({ ...profile, gradTerm: e.target.value })} //changed code
          required
        >
          <option value="">Choose one</option>
          <option value="option1">Spring</option>
          <option value="option2">Summer</option>
          <option value="option3">Fall</option>
        </select>

        <label htmlFor="aboutMe">About Me</label>
        <textarea
          id="aboutMe"
          placeholder="You can write about your years of experience, industry, or skills. People also talk about their achievements or previous job experiences."
          name="aboutMe"
          value={profile.aboutMe}
          onChange={handleProfileChange}
        />

        <h3>Experiences</h3>
        {experiences.map((experience, index) => (
          <div key={index} className="experience-section">
            <label htmlFor={`jobPosition-${index}`}>
              Job Position <div className="required-fields">*</div>{" "}
            </label>
            <input
              type="text"
              id={`jobPosition-${index}`}
              name="jobPosition"
              value={experience.jobPosition}
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

            <label htmlFor={`type-${index}`}>Type</label>
            <select
              id={`type-${index}`}
              name="type"
              value={experience.type}
              onChange={(e) => handleExperienceChange(index, e)}
            >
              <option value="">Choose One</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Self-employed">Self-employed</option>
              <option value="Freelance">Freelance</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Apprenticeship">Apprenticeship</option>
              <option value="Seasonal">Seasonal</option>
            </select>

            <label htmlFor={`location-${index}`}>Location</label>
            <input
              type="text"
              id={`location-${index}`}
              name="location"
              value={experience.location}
              onChange={(e) => handleExperienceChange(index, e)}
            />

            <label htmlFor={`startDate-${index}`}>
              Start Date <div className="required-fields">*</div>
            </label>
            <input
              type="date"
              id={`startDate-${index}`}
              name="startDate"
              value={experience.startDate}
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
              disabled={experience.current}  // Disable end date if current is checked
            />

            <div className="experience-checkbox">
              <input
                type="checkbox"
                name="current"
                checked={experience.current}
                onChange={(e) => handleExperienceChange(index, e)}
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
        <button type="button" onClick={addExperience}>
          Add More
        </button>

        <h3>Skills</h3>
        {skills.map((skill, index) => (
          <div key={index} className="skills-section">
            <label htmlFor={`skillName-${index}`}>
              Skill Name <div className="required-fields">*</div>
            </label>
            <input
              type="text"
              id={`skillName-${index}`}
              name="skillName"
              value={skill.skillName}
              onChange={(e) => handleSkillChange(index, e)}
              required
            />

            <label htmlFor={`proficiency-${index}`}>Proficiency</label>
            <select
              id={`proficiency-${index}`}
              name="proficiency"
              value={skill.proficiency}
              onChange={(e) => handleSkillChange(index, e)}
            >
              <option value="">Choose One</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        ))}
        <button type="button" onClick={addSkill}>
          Add More
        </button>

        <Link to="/view-profile" className="edit-profile-button">
          <button className="edit-profile-submit">Save</button>
        </Link>
      </form>
    </div>
  );
};

export default ProfileEditAlumni;
