import "./Profile.css";

export default function ProfileAlumPage({
  firstName,
  lastName,
  classification,
  gradYear,
  yearsOfExperience,
  jobPosition,
  aboutMe,
  projectName,
  projectDescript,
  experience,
  profilePic,
}) {
  return (
    <>
      <div className="profile-linear-gradient">
        <div className="profile-large-container">
          <div className="profile-flex">
            <div>
              <div className="profile-white-block">
                <div className="profile-p-pic"></div>
                <div className="profile-size">
                  <h1 className="profile-font profile-name-size">
                    Roary Royce
                  </h1>
                  <h2 className="profile-font profile-class-size">Alumni</h2>
                </div>
              </div>
              <div className="profile-white-block">
                <div className="profile-font-bold">
                  <p className="profile-font">Grad Year:</p>
                  <p className="profile-font">Years of Experience: </p>
                  <p className="profile-font">Job Position:</p>
                </div>
              </div>
              <div className="about-us-container">
                <div>
                  <h3 className="title-text profile-font">ABOUT ME</h3>
                  <div className="title-about-line"></div>
                  <p className="profile-descript profile-font">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="experience-container">
              <h3 className="title-text profile-font">EXPERIENCE</h3>
              <div className="title-experience-line"></div>
            </div>
          </div>
          <div className="project-container">
            <h3 className="title-text profile-font">PROJECTS</h3>
            <div className="title-project-line"></div>
            <div>
              <h4 className="project-title profile-font">Project 1</h4>
              <p className="profile-descript profile-font">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
