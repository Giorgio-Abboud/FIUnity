import React, { useState } from 'react';
import axios from 'axios';
import defaultProfilePicture from './assets/Default_pfp.png';
import "./profileEdit.css";

const ProfileEdit = () => {
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        graduationYear: '',
        major: '',
        aboutMe: '',
        profilePicture: null
    });
    const [experiences, setExperiences] = useState([{ jobPosition: '', companyName: '', startDate: '', endDate: '', description: '' }]);
    const [projects, setProjects] = useState([{ projectName: '', description: '' }]);

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleExperienceChange = (index, e) => {
        const { name, value } = e.target;
        const newExperiences = experiences.slice();
        newExperiences[index][name] = value;
        setExperiences(newExperiences);
    };

    const handleProjectChange = (index, e) => {
        const { name, value } = e.target;
        const newProjects = projects.slice();
        newProjects[index][name] = value;
        setProjects(newProjects);
    };

    const handleProfilePictureChange = (e) => {
        // Update the profile picture state when a new file is selected
        setProfile({ ...profile, profilePicture: e.target.files[0] });
    };

    const addExperience = () => {
        setExperiences([...experiences, { jobPosition: '', companyName: '', startDate: '', endDate: '', description: '' }]);
    };

    const addProject = () => {
        setProjects([...projects, { projectName: '', description: '' }]);
    };
    
    const handleSubmit = async (e) => {
        console.log('Form submitted'); 
        e.preventDefault();

        console.log('It got here')
        // Create the data object to send
        const profileData = {
            profile,
            experiences,
            projects
        };

        try {
            const response = await axios.post("http://localhost:8008/profile/profile-edit/", profileData);
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
                            src={profile.profilePicture ? URL.createObjectURL(profile.profilePicture) : defaultProfilePicture}
                            alt="Profile"
                            className="profile-picture"
                        />
                        <input
                            type="file"
                            id="profilePicture"
                            name="profilePicture"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleProfilePictureChange}
                        />
                        <label htmlFor="profilePicture" className="choose-image-button">Choose Image</label>
                    </div>
                    <div className="name-container">
                        <label htmlFor="firstName">First Name <div className="required-fields">*</div></label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={profile.firstName}
                            onChange={handleProfileChange}
                            required
                        />
                        <label htmlFor="lastName">Last Name <div className="required-fields">*</div></label>
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

                <label htmlFor="graduationYear">Graduation Year <div className="required-fields">*</div></label>
                <input
                    type="text"
                    id="graduationYear"
                    name="graduationYear"
                    value={profile.graduationYear}
                    onChange={handleProfileChange}
                    required
                />

                <label htmlFor="major">Major <div className="required-fields">*</div></label>
                <input
                    type="text"
                    id="major"
                    name="major"
                    value={profile.major}
                    onChange={handleProfileChange}
                    required
                />

                <label htmlFor="aboutMe">About Me</label>
                <textarea
                    id="aboutMe"
                    name="aboutMe"
                    value={profile.aboutMe}
                    onChange={handleProfileChange}
                />

                <h3>Experiences</h3>
                {experiences.map((experience, index) => (
                    <div key={index} className="experience-section">
                        <label htmlFor={`jobPosition-${index}`}>Job Position <div className="required-fields">*</div> </label>
                        <input
                            type="text"
                            id={`jobPosition-${index}`}
                            name="jobPosition"
                            value={experience.jobPosition}
                            onChange={(e) => handleExperienceChange(index, e)}
                            required
                        />

                        <label htmlFor={`companyName-${index}`}>Company Name <div className="required-fields">*</div></label>
                        <input
                            type="text"
                            id={`companyName-${index}`}
                            name="companyName"
                            value={experience.companyName}
                            onChange={(e) => handleExperienceChange(index, e)}
                            required
                        />

                        <label htmlFor={`startDate-${index}`}>Start Date <div className="required-fields">*</div></label>
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
                        />

                        <label htmlFor={`description-${index}`}>Description </label>
                        <textarea
                            id={`description-${index}`}
                            name="description"
                            value={experience.description}
                            onChange={(e) => handleExperienceChange(index, e)}
                        />
                    </div>
                ))}
                <button type="button" onClick={addExperience}>Add More</button>

                <h3>Projects</h3>
                {projects.map((project, index) => (
                    <div key={index} className="project-section">
                        <label htmlFor={`projectName-${index}`}>Project Name <div className="required-fields">*</div></label>
                        <input
                            type="text"
                            id={`projectName-${index}`}
                            name="projectName"
                            value={project.projectName}
                            onChange={(e) => handleProjectChange(index, e)}
                            required
                        />

                        <label htmlFor={`description-${index}`}>Description </label>
                        <textarea
                            id={`description-${index}`}
                            name="description"
                            value={project.description}
                            onChange={(e) => handleProjectChange(index, e)}
                        />
                    </div>
                ))}
                <button type="button" onClick={addProject}>Add More</button>

                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default ProfileEdit;
