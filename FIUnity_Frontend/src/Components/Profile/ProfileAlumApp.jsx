import ProfileAlumPage from "./ProfileAlumPage";
import axios from "axios";

const exampleExperiences = [
  {
    jobTitle: "Software Engineer",
    location: "San Francisco, CA",
    timePeriod: "Jan 2020 - Present",
    description:
      "Worked on developing web applications using React and Node.js.",
  },
  {
    jobTitle: "Junior Developer",
    location: "New York, NY",
    timePeriod: "Jun 2018 - Dec 2019",
    description:
      "Assisted in developing mobile applications and performing code reviews.",
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
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

function ProfileAlumApp() {
  return (
    <>
      <ProfileAlumPage
        firstName="Roary"
        lastName="Royce"
        classification="Alumni"
        gradYear="2020" //set four digit limit
        yearsOfExperience="4" //set two digit limit
        currJobPosition="Senior Developer" //set four word limit
        aboutMe="Lorem ipsum dolor sit amet, consectetu" //max char count: 850
        profilePic="/images/roary-profile-pic.jpg"
        experiences={exampleExperiences}
        projects={exampleProjects}
      /> 
    </>
  );
}
export default ProfileAlumApp;
