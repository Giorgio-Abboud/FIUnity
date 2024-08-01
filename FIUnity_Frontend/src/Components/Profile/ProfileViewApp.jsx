import ProfileViewPage from "./ProfileViewPage";
import React, { useState, useEffect } from "react";
import axios from "axios";
import defaultProfilePicture from "../../assets/Default_pfp.png";
// import {
// } from "../api/profileApi.js";

const exampleExperiences = [
  {
    jobTitle: "Software Engineer",
    companyName: "Capital One",
    location: "San Francisco, CA",
    startDate: "Jan 2020",
    endDate: "- Present",
    jobType: "Part-time",
    description:
      "Worked on developing web applications using React and Node.js. Assisted in developing mobile applications and performing code reviews. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    jobTitle: "Junior Developer",
    companyName: "Google",
    location: "New York, NY",
    startDate: "Jun 2018",
    endDate: "- Aug 2019",
    jobType: "Internship",
    description:
      "As a Software Engineer, I thrive in designing and developing robust software solutions that drive business efficiency and user satisfaction. I am skilled in analyzing user requirements, architecting scalable systems, and implementing clean, maintainable code in languages like Java and Python. Collaborating with cross-functional teams, I translate complex technical requirements into elegant software designs, ensuring seamless integration with existing systems and adherence to industry best practices. My role involves conducting rigorous testing, debugging issues, and optimizing performance to deliver reliable software solutions. I am passionate about continuous learning, staying abreast of emerging technologies, and mentoring junior engineers to foster a culture of innovation and excellence.", //discuss how size increases and boxes look weird
  },
];

const exampleProjects = [
  {
    name: "Project 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    skills: ["Java", "Django", "Python"],
  },
  {
    name: "Project 2",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    skills: ["Java", "Django", "Python"],
  },
  {
    name: "Project 3",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    skills: ["Java", "Django", "Python"],
  },
  {
    name: "Project 4",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    skills: ["Java", "Django", "Python"],
  },
];

// const extracurriculars = [
//   {
//     name: "Women in Computer Science",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//   },
//   {
//     name: "INIT",
//     description:
//       "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
//   },
//   {
//     name: "SWE",
//     description:
//       "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//   },
//   {
//     name: "INIT",
//     description:
//       "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
//   },
// ];

const skills = [
  {
    name: "Java",
  },
  {
    name: "Django",
  },
  {
    name: "Python",
  },
  {
    name: "React",
  },
  {
    name: "JavaScript",
  },
  {
    name: "Node.js",
  },
  {
    name: "C++",
  },
  {
    name: "Ruby on Rails",
  },
  {
    name: "SQL",
  },
  {
    name: "Angular",
  },
  {
    name: "Swift",
  },
  {
    name: "Spring",
  },
  {
    name: "Kotlin",
  },
  {
    name: "Vue.js",
  },
  {
    name: "PHP",
  },
  {
    name: "ASP.NET",
  },
  {
    name: "Go",
  },
  {
    name: "Flask",
  },
];


const ProfileViewApp = () => {

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/profile/mainpage/", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        console.log('response', response)
        setProfileData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <ProfileViewPage
          firstName={profileData.profile.first_name}
          middleName={profileData.profile.middle_name}
          lastName={profileData.profile.last_name}
          classification={profileData.profile.check_graduation_status}
          gradTerm={profileData.profile.grad_term}
          gradDate={profileData.profile.graduation_year}
          network={profileData.profile.network}
          major={profileData.major}
          minor={profileData.profile.minor}
          currJobPosition={profileData.curr_job_position}
          careerInterest={profileData.profile.career_interest}
          aboutMe={profileData.profile.about_me}
          resumeURL={profileData.resume_url}
          profilePic={profileData.profile.profile_pic}
          experiences={profileData.experience_data || []}
          projects={profileData.project_data || []}
          skills={profileData.skill_data || []}
          extracurriculars={profileData.extra_data|| []}
      />
    </>
  );
}
export default ProfileViewApp;
