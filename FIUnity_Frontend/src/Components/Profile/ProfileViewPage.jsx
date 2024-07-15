import "./ProfileView.css";

export default function ProfileViewPage({
  firstName,
  middleName,
  lastName,
  classification,
  gradDate,
  gradTerm,
  currJobPosition,
  careerInterest,
  major,
  resumeURL,
  aboutMe,
  projects,
  experiences,
  profilePic,
  skills,
  extracurriculars,
}) {
  return (
    <>
      <div className="profile-box">
        <div className="profile-large-container">
          <div className="profile-flex">
            <div>
              <div className="profile-white-block">
                <img
                  src={profilePic}
                  alt="profile picture"
                  className="profile-p-pic"
                />
                <div className="profile-size">
                  <h1 className="profile-font profile-name-size">
                    {firstName} {middleName} {lastName}
                  </h1>
                  <p className="profile-font profile-class-size">
                    {classification}
                  </p>
                </div>
              </div>
              <div className="profile-white-block">
                <div>
                  <div className="three-text-flex">
                    <p className="profile-font profile-font-bold">Grad Date:</p>
                    <p className="three-text-ans profile-font">
                      {gradTerm} {gradDate}
                    </p>
                  </div>
                  <div className="three-text-">
                    {classification == "Alumni" ? (
                      <div className="three-text-flex">
                        <p className="profile-font profile-font-bold">
                          Job Position:
                        </p>
                        <p className="three-text-ans profile-font">
                          {currJobPosition}
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="three-text-flex">
                          <p className="profile-font profile-font-bold">
                            Major:
                          </p>
                          <p className="three-text-ans profile-font">{major}</p>
                        </div>
                        <div className="three-text-flex">
                          <p className="profile-font profile-font-bold">
                            Career Interest:
                          </p>
                          <p className="three-text-ans profile-font">
                            {careerInterest}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="three-text-flex">
                    <p className="profile-font-bold profile-gold profile-bold">
                      Resume:
                    </p>
                    <p className="three-text-ans profile-font">
                      <a
                        href={resumeURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {resumeURL}
                      </a>
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
            <div>
              <div className="skills-container">
                <div className="sticky-heading">
                  <h3 className="title-text profile-font">SKILLS</h3>
                  <div className="title-skills-line"></div>
                  <div className="skills-item-container">
                    {skills.map((skill, index) => (
                      <div key={index}>
                        <p className="skills-item">{skill.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {classification == "Student" && (
                <>
                  <div className="project-container">
                    <h3 className="title-text profile-font">PROJECTS</h3>
                    <div className="title-project-line"></div>
                    <div>
                      {projects.map((project, index) => (
                        <div key={index}>
                          <div className="project-tab-container">
                            <h4 className="profile-title profile-font-bold profile-font profile-gold">
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
                </>
              )}
            </div>
          </div>
          {classification == "Student" && (
            <>
              <div className="extra-container">
                <h3 className="title-text profile-font">EXTRACURRICULARS</h3>
                <div className="title-extra-line"></div>
                {extracurriculars.length > 0 && (
                  <div>
                    {extracurriculars.map((extracurricular, index) => (
                      <div key={index}>
                        <div className="extra-tab-container">
                          <h4 className="profile-title profile-font-bold profile-font profile-gold">
                            {extracurricular.name}
                          </h4>
                          <p className="profile-descript profile-font">
                            {extracurricular.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
          <div className="experience-container">
            <h3 className="title-text profile-font">EXPERIENCE</h3>
            <div className="title-experience-line"></div>
            <>
              {experiences.map((experience, index) => (
                <div key={index}>
                  <div className="experience-tab-container">
                    <div>
                      <p className="profile-title profile-font profile-font-bold">
                        {experience.jobTitle}
                      </p>
                      <p className="experience-company-name  profile-gold profile-font">
                        {experience.companyName}
                      </p>
                      <p className="profile-font experience-text profile-gold">
                        {experience.location}
                      </p>
                      <p className="profile-font experience-text profile-gold experience-time-type">
                        {experience.startDate} - {experience.endDate}
                      </p>
                      <p className="profile-font experience-text profile-gold experience-time-type">
                        {experience.jobType}
                      </p>
                    </div>
                    <p className="profile-descript profile-font">
                      {experience.description}
                    </p>
                  </div>
                </div>
              ))}
            </>
          </div>
          {/* <div className="skills-container">
            <h3 className="title-text profile-font">SKILLS</h3>
            <div className="title-skills-line"></div>
            {skills.length > 0 && (
              <div>
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="skills-project-tab-container">
                      <div></div>
                      <p className="profile-skills profile-font-bold">
                        {skill.name}
                      </p>
                      <p className="profile-skills-level profile-gold">
                        {skill.proficiency}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div> */}
        </div>
      </div>
    </>
  );
}
