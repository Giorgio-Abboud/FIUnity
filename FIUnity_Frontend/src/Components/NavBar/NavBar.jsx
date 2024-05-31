import React, { useState } from "react";
import "./NavBar.css";
import Logo_icon from "../../assets/FIUnityLogo.png";
import Pawprint_icon from "../../assets/paw print.png";
import Newsfeed_icon from "../../assets/Newsfeed icon.png";
import Jobs_icon from "../../assets/Jobs icon.png";
import Profile_icon from "../../assets/Profile icon.png";
import { Link } from "react-router-dom";

const JobDropdown = ({ isOpen, toggleDropdown }) => {
  return (
    <div
      className="job-dropdown"
      onMouseEnter={() => toggleDropdown(true)}
      onMouseLeave={() => toggleDropdown(false)}
    >
      <div className="job-btn" onClick={toggleDropdown}>
        <img src={Jobs_icon} alt="Jobs Icon" className="job-icon" />
        <Link to="/jobs-list" className="nav-link">
          Jobs
        </Link>
      </div>
      {isOpen && (
        <div className="jobs-dropdown-content">
          <Link to="/job-posting">Create Job</Link>
          <Link to="/jobs-list">View Jobs</Link>
        </div>
      )}
    </div>
  );
};

const ProfileDropdown = ({ isOpen, toggleDropdown }) => {
  return (
    <div
      className="profile-dropdown"
      onMouseEnter={() => toggleDropdown(true)}
      onMouseLeave={() => toggleDropdown(false)}
    >
      <div className="profile-btn" onClick={toggleDropdown}>
        <img src={Profile_icon} alt="Profile Icon" className="profile-icon" />
        <Link to="/view-profile" className="nav-link">
          Profile
        </Link>
      </div>
      {isOpen && (
        <div className="profile-dropdown-content">
          <Link to="/view-profile">View Profile</Link>
          <Link to="/profile-edit">Edit Profile</Link>
        </div>
      )}
    </div>
  );
};


const NavBar = () => {
  const [isSearchBold, setIsSearchBold] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchClick = () => {
    setIsSearchBold(true);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="NavBar">
      <img src={Logo_icon} alt="FIUnity Logo" className="logo" />

      <div
        className={`searchBox ${isSearchBold ? "bold-search" : ""}`}
        onClick={handleSearchClick}
      >
        <input type="text" placeholder="Search..." />
        <img src={Pawprint_icon} alt="Paw Print Icon" />
      </div>

      <div className="NavBar_Icons">
        <div className="icon-container">
          <img src={Newsfeed_icon} alt="Newsfeed Icon" className="icon" />
          <Link to="/newsfeed" className="nav-link">
            Newsfeed
          </Link>
        </div>

        <JobDropdown isOpen={isOpen} toggleDropdown={toggleDropdown} />
        <ProfileDropdown isOpen={isOpen} toggleDropdown={toggleDropdown} />
        
        <div className="Log-out">
          <Link to="/logout" className="logout-button">
            <button className="Logout">Logout</button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NavBar;
