import React, { useState } from "react";
import "./NavBar.css";
import FIUnity_logo from "../../assets/fiunity logo.png";
import Pawprint_icon from "../../assets/paw print.png";
import Home_icon from "../../assets/home icon.png";
import Newsfeed_icon from "../../assets/Newsfeed icon.png";
import Jobs_icon from "../../assets/Jobs icon.png";
import { Link } from "react-router-dom";

const JobDropdown = ({ isOpen, toggleDropdown }) => {
  return (
    <div
      className="job-dropdown"
      onMouseEnter={() => toggleDropdown(true)}
      onMouseLeave={() => toggleDropdown(false)}
    >
      <div className="job-btn navbar-items" onClick={toggleDropdown}>
        <img src={Jobs_icon} alt="" className="job-icon" />
        <Link to="/jobs-list" className="nav-link">
          Jobs
        </Link>
      </div>
      {isOpen && (
        <div className="dropdown-content">
          <Link to="/job-posting">Create Job</Link>
          <Link to="/jobs-list">View Jobs</Link>
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
      <img src={FIUnity_logo} alt="" className="FIUnity logo" />

      <div
        className={`searchBox ${isSearchBold ? "bold-search" : ""}`}
        onClick={handleSearchClick}
      >
        <input type="text" placeholder="Search..." />
        <img src={Pawprint_icon} alt="" />
      </div>

      <div className="NavBar_Icons">
        <div className="icon-container">
          <img src={Home_icon} alt="" className="icon" />
          <Link to="/home" className="nav-link">
            Home
          </Link>
        </div>
        <div className="icon-container">
          <img src={Newsfeed_icon} alt="" className="icon" />
          <Link to="/newsfeed" className="newsfeed nav-link">
            Newsfeed
          </Link>
        </div>

        <JobDropdown isOpen={isOpen} toggleDropdown={toggleDropdown} />

        <div className="Log-out">
          <Link to="/logout">
            <button className="Logout">Logout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
