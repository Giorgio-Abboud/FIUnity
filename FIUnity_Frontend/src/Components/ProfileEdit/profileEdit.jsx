import React, { useState } from 'react';
import "./profileEdit.css";

const ProfileEdit = () => {
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        graduationYear: '',
        major: '',
        aboutMe: ''
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

    const addExperience = () => {
        setExperiences([...experiences, { jobPosition: '', companyName: '', startDate: '', endDate: '', description: '' }]);
    };

    const addProject = () => {
        setProjects([...projects, { projectName: '', description: '' }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Profile:', profile);
        console.log('Experiences:', experiences);
        console.log('Projects:', projects);
        // You can now send this data to your backend
    };

    return (
        <div className="profile-form">
            <form className="profile-editing" onSubmit={handleSubmit}>
                <h2>Edit Profile</h2>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleProfileChange}
                    required
                />

                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleProfileChange}
                    required
                />

                <label htmlFor="graduationYear">Graduation Year:</label>
                <input
                    type="text"
                    id="graduationYear"
                    name="graduationYear"
                    value={profile.graduationYear}
                    onChange={handleProfileChange}
                    required
                />

                <label htmlFor="major">Major:</label>
                <input
                    type="text"
                    id="major"
                    name="major"
                    value={profile.major}
                    onChange={handleProfileChange}
                    required
                />

                <label htmlFor="aboutMe">About Me:</label>
                <textarea
                    id="aboutMe"
                    name="aboutMe"
                    value={profile.aboutMe}
                    onChange={handleProfileChange}
                />

                <h3>Experiences</h3>
                {experiences.map((experience, index) => (
                    <div key={index} className="experience-section">
                        <label htmlFor={`jobPosition-${index}`}>Job Position:</label>
                        <input
                            type="text"
                            id={`jobPosition-${index}`}
                            name="jobPosition"
                            value={experience.jobPosition}
                            onChange={(e) => handleExperienceChange(index, e)}
                        />

                        <label htmlFor={`companyName-${index}`}>Company Name:</label>
                        <input
                            type="text"
                            id={`companyName-${index}`}
                            name="companyName"
                            value={experience.companyName}
                            onChange={(e) => handleExperienceChange(index, e)}
                        />

                        <label htmlFor={`startDate-${index}`}>Start Date:</label>
                        <input
                            type="date"
                            id={`startDate-${index}`}
                            name="startDate"
                            value={experience.startDate}
                            onChange={(e) => handleExperienceChange(index, e)}
                        />

                        <label htmlFor={`endDate-${index}`}>End Date:</label>
                        <input
                            type="date"
                            id={`endDate-${index}`}
                            name="endDate"
                            value={experience.endDate}
                            onChange={(e) => handleExperienceChange(index, e)}
                        />

                        <label htmlFor={`description-${index}`}>Description:</label>
                        <textarea
                            id={`description-${index}`}
                            name="description"
                            value={experience.description}
                            onChange={(e) => handleExperienceChange(index, e)}
                        />
                    </div>
                ))}
                <button type="button" onClick={addExperience}>Add More Experience</button>

                <h3>Projects</h3>
                {projects.map((project, index) => (
                    <div key={index} className="project-section">
                        <label htmlFor={`projectName-${index}`}>Project Name:</label>
                        <input
                            type="text"
                            id={`projectName-${index}`}
                            name="projectName"
                            value={project.projectName}
                            onChange={(e) => handleProjectChange(index, e)}
                        />

                        <label htmlFor={`description-${index}`}>Description:</label>
                        <textarea
                            id={`description-${index}`}
                            name="description"
                            value={project.description}
                            onChange={(e) => handleProjectChange(index, e)}
                        />
                    </div>
                ))}
                <button type="button" onClick={addProject}>Add More Project</button>

                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default ProfileEdit;
