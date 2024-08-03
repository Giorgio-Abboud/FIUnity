import ProfileViewPage from "./ProfileViewPage";
import React, { useState, useEffect } from "react";
import axios from "axios";
import defaultProfilePicture from "../../assets/Default_pfp.png";

const mapExperienceData = (data) => {
  return data.map(exp => ({
    jobTitle: exp.job_position,
    jobType: exp.job_type,
    companyName: exp.company_data.name, 
    location: exp.location,
    startDate: exp.start_date,
    endDate: exp.end_date || 'Present',
    description: exp.description,
  }));
};

const mapProjectData = (data) => {
  return data.map(project => ({
    name: project.project_data.name || '',
    description: project.description, 
    skills: project.skills || [], 
  }));
};

const mapExtracurrData = (data) => {
  return data.map(extracurr => ({
    extracurricular: extracurr.extracurricular_data.name || '',
    description: extracurr.description || ''
  }))
}

const mapSkillData = (data) => {
  console.log('data', data);
  return data.map(skill => ({
    skillName: skill.skill_name
  }));
};

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
        console.log('response', response.data);

        setProfileData({...response.data, experience_data: mapExperienceData(response.data.experience_data), project_data: mapProjectData(response.data.project_data), extra_data: mapExtracurrData(response.data.extra_data), skill_data: mapSkillData(response.data.skill_data)});
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
          major={profileData.profile.major}
          minor={profileData.profile.minor}
          currJobPosition={profileData.curr_job_position}
          careerInterest={profileData.profile.career_interest}
          aboutMe={profileData.profile.about}
          resumeURL={profileData.profile.resume}
          profilePic={profileData.profile.picture || defaultProfilePicture}
          experiences={profileData.experience_data}
          projects={profileData.project_data}
          skills={profileData.skill_data}
          extracurriculars={profileData.extra_data}
      />
    </>
  );
}
export default ProfileViewApp;
