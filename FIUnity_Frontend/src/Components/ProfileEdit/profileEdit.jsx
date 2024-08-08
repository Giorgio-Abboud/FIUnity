import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axiosInstance from "../api/profileApi.js";
import { useNavigate } from "react-router-dom";
import {
  createExtracurricular,
  updateExtracurricular,
  deleteExtracurricular,
  createProject,
  updateProject,
  deleteProject,
  createSkill,
  deleteSkill,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../api/profileApi.js";
import "./profileEdit.css";
import Search from "./search";
import axios from "axios";

const ProfileEdit = ({ classification }) => {
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

  const defaultExperience = {
    id: uuidv4(),
    jobTitle: "",
    companyName: "",
    type: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  };

  const defaultProject = {
    id: uuidv4(),
    projectName: "",
    description: "",
    projectSkills: [],
    skillsInput: "",
  };

  const defaultExtracurr = {
    id: uuidv4(),
    extracurrName: "",
    description: "",
  };

  const [extracurr, setExtracurr] = useState([]);
  const [projects, setProjects] = useState([defaultProject]);
  const [experiences, setExperiences] = useState([defaultExperience]);
  const [skills, setSkills] = useState([]);

  const [selectedMajor, setSelectedMajor] = useState(profile.major);
  const [skillsError, setSkillsError] = useState(false);
  const [url, setUrl] = useState(profile.url);
  const [urlError, setUrlError] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profile = await axiosInstance.get("/userprofile/");
        const experience = await axiosInstance.get("/experiences/");
        const project = await axiosInstance.get("/projects/");
        const extracurr = await axiosInstance.get("/extracurriculars/");

        const data = profile.data;
        const expData = experience.data;
        const projData = project.data;
        const extracurrData = extracurr.data;

        const fetchBlob = async (url) => {
          const profile = await fetch(url);
          const blob = await profile.blob();
          return blob;
        };

        const profilePictureBlob = data.picture
          ? await fetchBlob(data.picture)
          : null;
        const resumeBlob = data.resume ? await fetchBlob(data.resume) : null;
        setProfile({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          middleName: data.middle_name || "",
          graduationYear: data.graduation_year || "",
          gradTerm: data.grad_term || "",
          major: data.major || "",
          minor: data.minor || "",
          careerInterest: data.career_interest || "",
          aboutMe: data.about || "",
          profilePicture: profilePictureBlob
            ? URL.createObjectURL(profilePictureBlob)
            : null,
          resumeURL: resumeBlob ? URL.createObjectURL(resumeBlob) : "",
          url: data.company_url || "",
          network: data.network || "",
        });
        setExperiences(
          expData.length > 0
            ? expData.map((experience) => ({
                id: experience.id || uuidv4(),
                jobTitle: experience.job_position || "",
                companyName: experience.company_data.name || "",
                type: experience.job_type || "",
                location: experience.location || "",
                startDate: experience.start_date || "",
                endDate: experience.end_date || "",
                current: experience.currently_working || false,
                description: experience.description || "",
              }))
            : [defaultExperience]
        );
        setProjects(
          (projData.length > 0 ? projData : [defaultProject]).map(
            (project) => ({
              id: project.id || uuidv4(),
              projectName: project.project_data.name || "",
              description: project.description || "",
              projectSkills: project.skills || [],
            })
          )
        );
        setExtracurr(
          (extracurrData.length > 0 ? extracurrData : [defaultExtracurr]).map(
            (extracurr) => ({
              id: extracurr.id || uuidv4(),
              extracurrName: extracurr.extracurricular_data.name || "",
              description: extracurr.description || "",
            })
          )
        );

      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axiosInstance.get("/skills/");
        const skillsData = response.data;

        console.log('Fetched skills data:', skillsData);

        if (Array.isArray(skillsData) && skillsData.length > 0) {
          const mappedSkills = skillsData.map((skill) => ({
            id: skill.id || uuidv4(),
            skillName: skill.skill_name || "",
          }));
          console.log('Mapped skills data:', mappedSkills);
          setSkills(mappedSkills);
        } else {
          console.error('Fetched skills data is not an array or is empty');
        }
      } catch (error) {
        console.error("Failed to fetch skills data:", error);
      }
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    console.log('rendered skills', skills);
  }, [skills]);
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
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

  useEffect(() => {
    setSelectedMajor(profile.major);
  }, [profile.major]);

  const handleMajorChange = (event) => {
    const value = event.target.value;
    setSelectedMajor(value);
    setProfile((prevProfile) => ({ ...prevProfile, major: value }));
  };

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const newExperiences = [...experiences];
    newExperiences[index][name] = value;
    setExperiences(newExperiences);
  };

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = projects.map((item, idx) =>
      idx === index ? { ...item, [name]: value } : item
    );
      setProjects(updatedProjects);
  };

  const handleExtracurrChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExtracurr = extracurr.map((item, idx) =>
      idx === index ? { ...item, [name]: value } : item
    );
    setExtracurr(updatedExtracurr);
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
        setSkillsError(false);
      } else {
        setSkillsError(true);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedValue = e.target.value.trim();
      if (trimmedValue !== "") {
        const newSkill = { id: uuidv4(), skillName: trimmedValue };
        setSkills((prevSkills) => [...prevSkills, newSkill]);
        e.target.value = "";
      }
    }
  };

  const handleRemoveExperience = async (id) => {
    try {
      setExperiences((prevExperiences) =>
        prevExperiences.filter((experience) => experience.id !== id)
      );
      console.log(id);
      await deleteExperience(id);
    } catch (error) {
      console.error("Failed to delete experience:", error);
    }
  };

  const handleRemoveExtracurricular = async (id) => {
    try {
      console.log(id);
      setExtracurr((prevExtracurriculars) =>
        prevExtracurriculars.filter(
          (extracurricular) => extracurricular.id !== id
        )
      );
      await deleteExtracurricular(id);
    } catch (error) {
      console.error("Failed to delete extracurricular activity:", error);
    }
  };

  const handleRemoveSkill = async (id) => {
    try {
      console.log(id);
      setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== id));
      await deleteSkill(id);
    } catch (error) {
      console.error("Failed to delete skill:", error);
    }
  };

  const handleRemoveProject = async (id) => {
    try {
      console.log(id);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== id)
      );
      await deleteProject(id);
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const removeSkill = (projectIndex, skillIndex) => {
    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.map((project, pIndex) => {
        if (pIndex === projectIndex) {
          const updatedSkills = project.projectSkills.filter(
            (_, sIndex) => sIndex !== skillIndex
          );
          return { ...project, projectSkills: updatedSkills };
        }
        return project;
      });
      return updatedProjects;
    });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setProfile((prevProfile) => ({
        ...prevProfile,
        profilePicture: fileUrl,
      }));
    }
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
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setProfile({ ...profile, resume: file, resumeURL: fileURL });
    }
  };

  const convertBlobUrlToFile = async (blobUrl, fileName) => {
    try {
      const response = await fetch(blobUrl);
      const blob = await response.blob();
      return new File([blob], fileName, { type: blob.type });
    } catch (error) {
      console.error("Failed to convert Blob URL to File:", error);
      return null;
    }
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: uuidv4(),
        jobTitle: "",
        companyName: "",
        type: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ]);
  };

  const addProject = () => {
    setProjects([
      ...projects,
      {
        id: uuidv4(),
        projectName: "",
        description: "",
        projectSkills: [],
        skillsInput: "",
      },
    ]);
  };

  const addExtracurr = () => {
    const newExtracurricular = {
      id: uuidv4(),
      extracurrName: "",
      description: "",
    };
    setExtracurr([...extracurr, newExtracurricular]);
  };

  const handleOnSearchChange = (index, searchData) => {
    console.log("searchData:", searchData);
    const newExperiences = [...experiences];
    newExperiences[index].location = searchData.label;
    setExperiences(newExperiences);
  };

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
    console.log("profile", profile);

    const formData = new FormData();

    if (profile.firstName) formData.append("first_name", profile.firstName);
    if (profile.lastName) formData.append("last_name", profile.lastName);
    if (profile.middleName) formData.append("middle_name", profile.middleName);
    if (profile.gradTerm) formData.append("grad_term", profile.gradTerm);
    if (profile.aboutMe) formData.append("about", profile.aboutMe);
    if (profile.graduationYfear)
      formData.append("graduation_year", profile.graduationYear);
    if (profile.major) formData.append("major", profile.major);
    if (profile.minor) formData.append("minor", profile.minor);
    if (profile.careerInterest)
      formData.append("career_interest", profile.careerInterest);
    if (profile.network) formData.append("network", profile.network);

    if (profile.profilePicture) {
      const profilePictureFile = await convertBlobUrlToFile(
        profile.profilePicture,
        "profile-picture.jpg"
      );
      if (profilePictureFile) {
        formData.append("picture", profilePictureFile);
      }
    }

    if (classification === "Alumni") {
      formData.append("company_url", profile.url);
    }

    if (profile.resumeURL) {
      const resumeFile = await convertBlobUrlToFile(
        profile.resumeURL,
        "resume.pdf"
      );
      if (resumeFile) {
        formData.append("resume", resumeFile);
      }
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      // Update profile information
      const response = await axios.patch(
        "http://localhost:8000/profile/userprofile/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      console.log("Profile updated successfully:", response.data);

      // Fetch existing data once
      const [
        existingExtracurriculars,
        existingProjects,
        existingExperiences,
        existingSkills,
      ] = await Promise.all([
        axiosInstance.get("/extracurriculars/"),
        axiosInstance.get("/projects/"),
        axiosInstance.get("/experiences/"),
        axiosInstance.get("/skills/"),
      ]);

      // Convert existing data to maps
      const extracurricularMap = new Map(
        existingExtracurriculars.data.map((e) => [e.id, e])
      );
      const projectMap = new Map(existingProjects.data.map((p) => [p.id, p]));
      const experienceMap = new Map(
        existingExperiences.data.map((e) => [e.id, e])
      );
      const skillMap = new Map(
        existingSkills.data.map((s) => [s.skill_name, s])
      );

      if (classification === "Student") {
        for (const extracurrData of extracurr) {
          console.log("Extracurr Data:", extracurrData);

          if (
            extracurrData.extracurrName.trim() === "" &&
            extracurrData.description.trim() === ""
          ) {
            // Skip this entry if blank entry
            continue;
          }

          if (extracurrData.id === defaultExtracurr.id) {
            // Skip the default entry during the update loop
            continue;
          }

          const existingExtracurricular = extracurricularMap.get(
            extracurrData.id
          );

          if (existingExtracurricular) {
            // Update existing extracurricular
            await updateExtracurricular(extracurrData.id, {
              extracurricular: extracurrData.extracurrName,
              description: extracurrData.description,
            });
          } else {
            // Create new extracurricular
            await createExtracurricular({
              extracurricular: extracurrData.extracurrName,
              description: extracurrData.description,
            });
          }
        }

        // Handle extracurricular default entry specifically
        const defaultEntry = extracurr.find(
          (e) => e.id === defaultExtracurr.id
        );
        if (defaultEntry) {
          if (!extracurricularMap.has(defaultEntry.id)) {
            await createExtracurricular({
              extracurricular: defaultEntry.extracurrName,
              description: defaultEntry.description,
            });
          } else {
            await updateExtracurricular(defaultEntry.id, {
              extracurricular: defaultEntry.extracurrName,
              description: defaultEntry.description,
            });
          }
        }
      }
      console.log("projectMap:", projectMap);
      console.log("projects:", projects);

      // Handle projects
      for (const projectData of projects) {
        if (
          projectData.projectName.trim() === "" &&
          projectData.description.trim() === ""
        ) {
          continue;
        }

        const existingProject = projectMap.get(projectData.id);
        console.log("prjdata", projectData);
        console.log("prjdata", projectData.id);

        if (existingProject) {
          // Update existing project
          await updateProject(existingProject.id, {
            project: projectData.projectName,
            description: projectData.description,
            skills: projectData.projectSkills,
          });
        } else {
          // Create new project
          await createProject({
            project: projectData.projectName,
            description: projectData.description,
            skills: projectData.projectSkills,
          });
        }
      }

      // Handle project default entry specifically
      const defaultProjectEntry = projects.find(
        (p) => p.id === defaultProject.id
      );

      if (defaultProjectEntry) {
        if (!projectMap.has(defaultProjectEntry.id)) {
          await createProject({
            project: defaultProjectEntry.projectName,
            description: defaultProjectEntry.description,
            skills: defaultProjectEntry.projectSkills,
          });
        } else {
          await updateProject(defaultProjectEntry.id, {
            project: defaultProjectEntry.projectName,
            description: defaultProjectEntry.description,
            skills: defaultProjectEntry.projectSkills,
          });
        }
      }

      // Handle experiences
      for (const experienceData of experiences) {
        const existingExperience = experienceMap.get(experienceData.id);

        if (existingExperience) {
          // Update existing experience
          await updateExperience(existingExperience.id, {
            job_position: experienceData.jobTitle,
            company: experienceData.companyName,
            job_type: experienceData.type,
            location: experienceData.location,
            start_date: experienceData.startDate,
            end_date: experienceData.current
              ? null
              : experienceData.endDate || "",
            currently_working: experienceData.current,
            description: experienceData.description,
            tagline: "",
          });
        } else {
          // Create new experience
          await createExperience({
            job_position: experienceData.jobTitle,
            company: experienceData.companyName,
            job_type: experienceData.type,
            location: experienceData.location,
            start_date: experienceData.startDate,
            end_date: experienceData.current
              ? null
              : experienceData.endDate || "",
            currently_working: experienceData.current,
            description: experienceData.description,
            tagline: "",
          });
        }
      }

      // Handle experience default entry specifically
      const defaultExperienceEntry = experiences.find(
        (e) => e.id === defaultExperience.id
      );

      if (defaultExperienceEntry) {
        if (!experienceMap.has(defaultExperienceEntry.id)) {
          // Create default entry if it doesn't exist in the map
          await createExperience({
            job_position: defaultExperienceEntry.jobTitle,
            company: defaultExperienceEntry.companyName,
            job_type: defaultExperienceEntry.type,
            location: defaultExperienceEntry.location,
            start_date: defaultExperienceEntry.startDate,
            end_date: defaultExperienceEntry.current
              ? null
              : defaultExperienceEntry.endDate || "",
            currently_working: defaultExperienceEntry.current,
            description: defaultExperienceEntry.description,
            tagline: "",
          });
        } else {
          // Update the default entry
          await updateExperience(defaultExperienceEntry.id, {
            job_position: defaultExperienceEntry.jobTitle,
            company: defaultExperienceEntry.companyName,
            job_type: defaultExperienceEntry.type,
            location: defaultExperienceEntry.location,
            start_date: defaultExperienceEntry.startDate,
            end_date: defaultExperienceEntry.current
              ? null
              : defaultExperienceEntry.endDate || "",
            currently_working: defaultExperienceEntry.current,
            description: defaultExperienceEntry.description,
            tagline: "",
          });
        }
      }

      if (skills && skills.length > 0) {
        for (const skill of skills) {
          if (skill.skillName.trim() !== "") {
            const existingSkill = skillMap.get(skill.skillName);
            if (!existingSkill) {
              await createSkill({ skill_name: skill.skillName });
            }
          }
        }
      }

      console.log("SUCCESS :)");
      navigate("/view-profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
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
                    <div className="url-req-container">
                      <div className="required-fields-company">*</div>
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
              className="about-me-scroll"
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
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
              <option value="Fall">Fall</option>
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
              <div key={experience.id} className="experience-section">
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
                <Search
                  value={{
                    value: experience.location,
                    label: experience.location,
                  }}
                  onSearchChange={(searchData) =>
                    handleOnSearchChange(index, searchData)
                  }
                />

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
                  max={new Date().toISOString().split("T")[0]}
                  disabled={experience.current} // Disable end date if current is checked
                />

                <div className="experience-checkbox">
                  <input
                    type="checkbox"
                    name="current"
                    checked={experience.current}
                    onChange={(e) =>
                      handleExperienceChange(index, {
                        target: { name: "current", value: e.target.checked },
                      })
                    }
                  />

                  <label className="checkbox-label">
                    I'm currently in this position
                  </label>
                </div>
                <label htmlFor={`description-${index}`}>Description </label>
                <textarea
                  className="experience-scroll"
                  id={`description-${index}`}
                  name="description"
                  value={experience.description}
                  onChange={(e) => handleExperienceChange(index, e)}
                />
                {index > 0 && (
                  <button
                    className="remove-item"
                    onClick={() => handleRemoveExperience(experience.id)}
                  >
                    Remove
                  </button>
                )}
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
                  <div key={project.id} className="project-section">
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
                      className="project-scroll"
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
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveProject(project.id)}
                        className="remove-item"
                      >
                        Remove
                      </button>
                    )}
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
                {extracurr.length > 0 && (
                  <>
                    {extracurr.map((extracurrs, index) => (
                      <div key={extracurrs.id} className="extracurr-section">
                        <label htmlFor={`extracurrName-${index}`}>
                          Extracurricular Name
                        </label>
                        <input
                          type="text"
                          id={`extracurrName-${index}`}
                          name="extracurrName"
                          value={extracurrs.extracurrName}
                          onChange={(e) => handleExtracurrChange(index, e)}
                        />

                        <label htmlFor={`description-${index}`}>
                          Description{" "}
                        </label>
                        <textarea
                          className="extra-descript-scroll"
                          id={`description-${index}`}
                          name="description"
                          value={extracurrs.description}
                          onChange={(e) => handleExtracurrChange(index, e)}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveExtracurricular(extracurrs.id)
                          }
                          className="remove-item"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </>
                )}
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
                {skills
                  .filter((skill) => skill.skillName.trim() !== "")
                  .map((skill) => (
                    <li key={skill.id} className="skills-item">
                      {skill.skillName}
                      <button
                        type="button"
                        className="remove-skill-button"
                        onClick={() => handleRemoveSkill(skill.id)}
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
                <option value="Seeking Internship">Seeking Internship</option>
                <option value="Seeking Job">Seeking Job</option>
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
              <button onClick={handleSubmit} className="edit-profile-submit">
                Save
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default ProfileEdit;

/* For ALUM: 
- skills don't populate in edit profile but is updated and saved in database and profile view page
- project patch requests are not working
*/
