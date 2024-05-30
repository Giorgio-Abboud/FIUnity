import "./Profile.css";

export default function ProfileAlumPage({
  firstName,
  lastName,
  classification,
  gradYear,
  yearsOfExperience,
  currJobPosition,
  aboutMe,
  jobPosition,
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
                <div>
                  <div className="three-text-flex">
                    <p className="profile-font profile-font-bold">Grad Year:</p>
                    <pm className="three-text-ans profile-font">xyz</pm>
                  </div>
                  <div className="three-text-flex">
                    <p className="profile-font profile-font-bold">
                      Years of Experience:{" "}
                    </p>
                    <p className="three-text-ans profile-font">xyz</p>
                  </div>
                  <div className="three-text-flex">
                    <p className="profile-font profile-font-bold">
                      Job Position:
                    </p>
                    <p className="three-text-ans profile-font">xyz</p>
                  </div>
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
              <div className="profile-font-bold">
                <p className="profile-title profile-font profile-font-bold">
                  Job Position
                </p>
                <p className="profile-font experience-text profile-font-bold">
                  Location
                </p>
                <p className="profile-font experience-text profile-font-bold">
                  Time
                </p>
              </div>
              <p className="profile-descript profile-font">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
              </p>
            </div>
          </div>
          <div className="project-container">
            <h3 className="title-text profile-font">PROJECTS</h3>
            <div className="title-project-line"></div>
            <div>
              <h4 className="profile-title profile-font-bold profile-font">
                Project 1
              </h4>
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
