import ProfileViewPage from "./ProfileViewPage";
import axios from "axios";

const exampleExperiences = [
  {
    jobTitle: "Software Engineer",
    location: "San Francisco, CA",
    startDate: "Jan 2020",
    endDate: "Present",
    jobType: "Part-time",
    description:
      "Worked on developing web applications using React and Node.js.",
  },
  {
    jobTitle: "Junior Developer",
    location: "New York, NY",
    startDate: "Jun 2018",
    endDate: "Aug 2019",
    jobType: "Internship",
    description:
      "Assisted in developing mobile applications and performing code reviews.", //discuss how size increases and boxes look weird
  },
];

const exampleProjects = [
  {
    name: "Project 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Project 2",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
];

const extracurriculars = [
  {
    name: "Women in Computer Science",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "INIT",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
];


const skills = [
  {
    name: "Java",
  },
  {
    name: "Django",
  },
];


function ProfileViewApp() {
  return (
    <>
      <ProfileViewPage
        firstName="Roary"
        lastName="Royce"
        classification="Student"
        gradTerm="Fall"
        gradDate="2020" //calander?
        major="Computer Science"
        currJobPosition="Senior Developer" //set four word limit
        careerInterest="Full-Stack Development"
        aboutMe="Lorem ipsum dolor sit amet, consectetu" //max char count: 850
        profilePic="/images/roary-profile-pic.jpg"
        experiences={exampleExperiences}
        projects={exampleProjects}
        skills={skills}
        extracurriculars={extracurriculars}
      /> 
    </>
  );
}
export default ProfileViewApp;
