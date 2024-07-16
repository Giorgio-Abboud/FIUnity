import ProfileViewPage from "./ProfileViewPage";
import axios from "axios";

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

const extracurriculars = [
  {
    name: "Women in Computer Science",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "INIT",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
  {
    name: "SWE",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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

function ProfileViewApp() {
  return (
    <>
      <ProfileViewPage
        firstName="Roary"
        middleName="Shay"
        lastName="Royce"
        classification="Student"
        gradTerm="Fall"
        gradDate="2020"
        network="OPEN TO CONNECT"
        major="Computer Science"
        minor="Math"
        currJobPosition="Senior Developer" //set character limit
        careerInterest="Full-Stack Development"
        aboutMe="Hello! My name is Alex, and I’m a passionate and curious individual with a profound love for technology and continuous learning. Ever since I can remember, I've been fascinated by how things work and how to make them better. This curiosity led me to pursue a degree in Computer Science, where I delved into the world of programming, algorithms, and software development. My journey has been a thrilling adventure of discovering new technologies, solving complex problems, and creating innovative solutions that make a difference.

Outside the realm of coding, I am an avid reader and an enthusiastic writer. I find solace in the pages of a good book, whether it's a gripping thriller, an inspiring biography, or a thought-provoking piece of science fiction. Writing allows me to articulate my thoughts and share my ideas with others, fostering connections and sparking conversations.

When I’m not immersed in the digital world, I love to explore the great outdoors. Hiking through lush forests, scaling mountain peaks, and camping under the stars are some of my favorite ways to unwind and reconnect with nature. I believe that the natural world offers a wealth of inspiration and perspective that is invaluable in our fast-paced, tech-driven lives.

" //max char count: 850
        resumeURL={"https://google.com/"}
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
