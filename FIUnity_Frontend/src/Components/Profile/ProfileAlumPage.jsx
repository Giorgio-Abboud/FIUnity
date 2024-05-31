import "./Profile.css";

export default function ProfileAlumPage({
  firstName,
  lastName,
  classification,
  gradYear,
  yearsOfExperience,
  currJobPosition,
  aboutMe,
  projects,
  experiences,
  profilePic,
}) {
  return (
    <>
      <div className="profile-linear-gradient">
        <div className="profile-large-container">
          <div className="profile-flex">
            <div>
              <div className="profile-white-block">
                <img src={profilePic} alt="profile picture" className="profile-p-pic" />
                <div className="profile-size">
                  <h1 className="profile-font profile-name-size">
                    {firstName} {lastName}
                  </h1>
                  <p className="profile-font profile-class-size">
                    {classification}
                  </p>
                </div>
              </div>
              <div className="profile-white-block">
                <div>
                  <div className="three-text-flex">
                    <p className="profile-font profile-font-bold">Grad Year:</p>
                    <p className="three-text-ans profile-font">{gradYear}</p>
                  </div>
                  <div className="three-text-flex">
                    <p className="profile-font profile-font-bold">
                      Years of Experience:{" "}
                    </p>
                    <p className="three-text-ans profile-font">
                      {yearsOfExperience}
                    </p>
                  </div>
                  <div className="three-text-flex">
                    <p className="profile-font profile-font-bold">
                      Job Position:
                    </p>
                    <p className="three-text-ans profile-font">
                      {currJobPosition}
                    </p>
                  </div>
                </div>
              </div>
              <div className="about-us-container">
                <div>
                  <h3 className="title-text profile-font">ABOUT ME</h3>
                  <div className="title-about-line"></div>
                  <p className="profile-descript profile-font">{aboutMe}</p>
                </div>
              </div>
            </div>
            <div className="experience-container">
              <h3 className="title-text profile-font">EXPERIENCE</h3>
              <div className="title-experience-line"></div>
              {experiences.map((experience, index) => (
                <div key={index}>
                  <div>
                    <p className="profile-title profile-font profile-font-bold">
                      {experience.jobTitle}
                    </p>
                    <p className="profile-font experience-text profile-gold">
                      {experience.location}
                    </p>
                    <p className="profile-font experience-text profile-gold experience-time">
                      {experience.timePeriod}
                    </p>
                  </div>
                  <p className="profile-descript profile-font">
                    {experience.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="project-container">
            <h3 className="title-text profile-font">PROJECTS</h3>
            <div className="title-project-line"></div>
            {projects.map((project, index) => (
              <div key={index}>
                <div>
                  <h4 className="profile-title profile-font-bold profile-font">
                    {project.name}
                  </h4>
                  <p className="profile-descript profile-font">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
