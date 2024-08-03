import "./ProfileView.css";
import React, { useState, useEffect, useRef } from "react";
import Carousel from "react-elastic-carousel";
import defaultProfilePicture from "../../assets/Default_pfp.png";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export default function ProfileViewPage({
  firstName = "",
  middleName = "",
  lastName = "",
  classification = "",
  gradDate = "",
  gradTerm = "",
  currJobPosition = "",
  careerInterest = "",
  major = "",
  minor = "",
  resumeURL = "",
  aboutMe = "",
  projects = [],
  experiences = [],
  profilePic = "",
  skills = [],
  extracurriculars = [],
  network = "",
}) {
  const [currentProjectSlide, setProjectCurrentSlide] = useState(0);
  const [currentExtracurricularSlide, setCurrentExtracurricularSlide] =
    useState(0);
  const [currentExperienceSlide, setCurrentExperienceSlide] = useState(0);
  const projectCarouselRef = useRef(null);
  const extracurricularsCarouselRef = useRef(null);
  const experiencesCarouselRef = useRef(null);
  const profilePictureUrl = profilePic ? profilePic : defaultProfilePicture;
  const navigate = useNavigate()

  const handleEditClick = () => {
    navigate('/profile-edit'); 
  };

  useEffect(() => {
    const projectInterval = setInterval(() => {
      if (projectCarouselRef.current) {
        setProjectCurrentSlide((prev) => {
          if (prev < projects.length - 1) {
            projectCarouselRef.current.slideNext();
            return prev + 1;
          } else {
            clearInterval(projectInterval);
            return prev;
          }
        });
      }
    }, 5000);

    const extracurricularsInterval = setInterval(() => {
      if (extracurricularsCarouselRef.current) {
        setCurrentExtracurricularSlide((prev) => {
          if (prev < extracurriculars.length - 1) {
            extracurricularsCarouselRef.current.slideNext();
            return prev + 1;
          } else {
            clearInterval(extracurricularsInterval);
            return prev;
          }
        });
      }
    }, 5000);

    const experiencesInterval = setInterval(() => {
      if (experiencesCarouselRef.current) {
        setCurrentExperienceSlide((prev) => {
          if (prev < experiences.length - 1) {
            experiencesCarouselRef.current.slideNext();
            return prev + 1;
          } else {
            clearInterval(experiencesInterval);
            return prev;
          }
        });
      }
    }, 5000);

    return () => {
      clearInterval(projectInterval);
      clearInterval(experiencesInterval);
      clearInterval(extracurricularsInterval);
    };
  }, [projects.length, extracurriculars.length, experiences.length]);

  if (
    !network // check if profile edit was completed, since this is a required field
  ) {
    return (
      <div className="empty-profile-message">
        It's really quiet over here...
        <div className="edit-container">
            <button className="edit-button" onClick={handleEditClick}>
              <CiEdit />
            </button>
          </div>
      </div>
    );
  }

  return (
    <>
      <div className="profile-box">
        <div className="profile-large-container">
          <div className="profile-flex">
            <div>
              <div className="profile-white-block">
                <img
                  src={profilePictureUrl}
                  alt="profile picture"
                  className="profile-p-pic"
                />
                <div className="profile-size">
                  <h1 className="profile-font profile-name-size">
                    {`${firstName} ${
                      middleName ? middleName + " " : ""
                    }${lastName}`}
                  </h1>
                  <p className="profile-font profile-class-size">
                  {`${classification === "Alumni" ? "Alum" : classification}`}                  </p>
                </div>
                <div className="network">{network}</div>
              </div>
              <div>
                <div
                  className={
                    classification == "Alumni"
                      ? "info-block-alum"
                      : "info-block"
                  }
                >
                  <div className="three-text-flex">
                    <p className="profile-font profile-font-bold">Grad Date:</p>
                    <p className="three-text-ans profile-font">
                      {gradTerm} {gradDate}
                    </p>
                  </div>
                  <div>
                    {classification == "Alumni" ? (
                      <div className="three-text-flex">
                        <p className="profile-font profile-font-bold">
                          Job Title:
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
                        <div className="three-text-flex">
                          <p className="profile-font profile-font-bold">
                            Minor:
                          </p>
                          <p className="three-text-ans profile-font">{minor}</p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="three-text-flex">
                    {classification == "Student" ? (
                      <p className="profile-font-bold profile-gold profile-bold">
                        Resume:
                      </p>
                    ) : (
                      <p className="profile-font-bold profile-gold profile-bold">
                        Company URL:
                      </p>
                    )}
                    <p className="three-text-ans profile-font">
                      <a
                        href={resumeURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Check out my resume!
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={
                  classification == "Alumni"
                    ? "about-us-alum"
                    : "about-us-container"
                }
              >
                <div>
                  <h3 className="title-text profile-font">ABOUT ME</h3>
                  <div className="title-about-line"></div>
                  <p className="profile-descript profile-font">{aboutMe}</p>
                </div>
              </div>
            </div>
            <div>
              {skills.length > 0 && (
                <div
                  className={
                    classification == "Alumni"
                      ? "skills-alum-container"
                      : "skills-container"
                  }
                >
                  <div className="sticky-heading">
                    <h3 className="title-text profile-font">SKILLS</h3>
                    <div className="title-skills-line"></div>
                  </div>
                  <div className="skills-item-container">
                    {skills.map((skill, index) => (
                      <div key={index}>
                        <p className="skills-item">{skill.skillName}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {classification == "Student" ? (
                <>
                  <div className="project-container">
                    <h3 className="title-text profile-font">PROJECTS</h3>
                    <div className="title-project-line"></div>
                    <div>
                      <Carousel
                        ref={projectCarouselRef}
                        renderPagination={({ pages, activePage, onClick }) => (
                          <div className="custom-pagination">
                            {pages.map((idx) => (
                              <button
                                key={idx}
                                className={`pagination-dot ${
                                  activePage === idx ? "active" : ""
                                }`}
                                onClick={() => onClick(idx)}
                              />
                            ))}
                          </div>
                        )}
                      >
                        {projects.map((project, idx) => (
                          <div
                            key={idx}
                            className={
                              skills.length > 0
                                ? "project-tab-skill"
                                : "project-tab-noskill"
                            }
                          >
                            <h4 className="profile-title profile-font-bold profile-font profile-gold">
                              {project.name}
                            </h4>
                            <p className="profile-descript profile-font">
                              {project.description}
                            </p>
                            <div className="skills-item-project-container">
                              {project.skills.map((skill, index) => (
                                <div key={index}>
                                  <p className="skills-item">{skill}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </Carousel>
                    </div>
                  </div>
                </>
              ) : (
                <div className="experience-alum-container">
                  <h3 className="title-text profile-font">EXPERIENCE</h3>
                  <div className="title-experience-line"></div>
                  <>
                    <Carousel
                      ref={experiencesCarouselRef}
                      renderPagination={({ pages, activePage, onClick }) => (
                        <div className="custom-pagination">
                          {pages.map((idx) => (
                            <button
                              key={idx}
                              className={`pagination-dot ${
                                activePage === idx ? "active" : ""
                              }`}
                              onClick={() => onClick(idx)}
                            />
                          ))}
                        </div>
                      )}
                    >
                      {experiences.map((experience, index) => (
                        <div
                          key={index}
                          className={
                            skills.length > 0
                              ? "experience-tab-skill"
                              : "experience-tab-noskill"
                          }
                        >
                          <div>
                            <p className="profile-title profile-font profile-font-bold">
                              {experience.jobTitle}
                            </p>
                            <p className="experience-company-name  profile-gold profile-font">
                              {experience.companyName}
                            </p>
                            {experience.location.length > 0 && (
                              <p className="profile-font experience-text profile-gold">
                                {experience.location}
                              </p>
                            )}
                            {experience.endDate.length > 0 && (
                              <p className="profile-font experience-text profile-gold experience-time-type">
                                {experience.startDate} -- {experience.endDate}
                              </p>
                            )}
                            <p className="profile-font experience-text profile-gold experience-time-type">
                              {experience.jobType}
                            </p>
                          </div>
                          {experience.description.length > 0 && (
                            <p className="profile-descript profile-font">
                              {experience.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </Carousel>
                  </>
                </div>
              )}
            </div>
          </div>
          {classification == "Student" && (
            <>
              {extracurriculars.length > 0 && (
                <>
                  <div className="extra-container">
                    <h3 className="title-text profile-font">
                      EXTRACURRICULARS
                    </h3>
                    <div className="title-extra-line"></div>
                    <Carousel
                      ref={extracurricularsCarouselRef}
                      renderPagination={({ pages, activePage, onClick }) => (
                        <div className="custom-pagination">
                          {pages.map((idx) => (
                            <button
                              key={idx}
                              className={`pagination-dot ${
                                activePage === idx ? "active" : ""
                              }`}
                              onClick={() => onClick(idx)}
                            />
                          ))}
                        </div>
                      )}
                    >
                      {extracurriculars.map((extracurricular, index) => (
                        <div key={index}>
                          <div className="extra-tab-container">
                            <h4 className="profile-title profile-font-bold profile-font profile-gold">
                              {extracurricular.extracurricular}
                            </h4>
                            <p className="profile-descript profile-font">
                              {extracurricular.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </Carousel>
                  </div>
                </>
              )}
            </>
          )}
          {experiences.length > 0 && (
            <>
              {classification == "Student" && (
                <div className="experience-container">
                  <h3 className="title-text profile-font">EXPERIENCE</h3>
                  <div className="title-experience-line"></div>
                  <>
                    <Carousel
                      className="experiences-carousel"
                      ref={experiencesCarouselRef}
                      renderPagination={({ pages, activePage, onClick }) => (
                        <div className="custom-pagination">
                          {pages.map((idx) => (
                            <button
                              key={idx}
                              className={`pagination-dot ${
                                activePage === idx ? "active" : ""
                              }`}
                              onClick={() => onClick(idx)}
                            />
                          ))}
                        </div>
                      )}
                    >
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
                              {experience.location.length > 0 && (
                                <p className="profile-font experience-text profile-gold">
                                  {experience.location}
                                </p>
                              )}
                              {experience.endDate.length > 0 && (
                                <p className="profile-font experience-text profile-gold experience-time-type">
                                  {experience.startDate} {experience.endDate}
                                </p>
                              )}
                              <p className="profile-font experience-text profile-gold experience-time-type">
                                {experience.jobType}
                              </p>
                            </div>
                            {experience.description.length > 0 && (
                              <p className="profile-descript profile-font">
                                {experience.description}
                              </p>
                            )}{" "}
                          </div>
                        </div>
                      ))}
                    </Carousel>
                  </>
                </div>
              )}
            </>
          )}
          <div className="edit-container">
            <button className="edit-button" onClick={handleEditClick}>
              <CiEdit />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
