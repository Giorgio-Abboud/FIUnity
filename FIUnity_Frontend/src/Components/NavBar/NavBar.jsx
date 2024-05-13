import React, { useState } from "react";
import "./NavBar.css";
import FIUnity_logo from "../../assets/fiunity logo.png";
import Pawprint_icon from "../../assets/paw print.png";
import Home_icon from "../../assets/home icon.png";
import Events_icon from "../../assets/Event icon.png";
import Jobs_icon from "../../assets/Jobs icon.png";

const JobDropdown = ({ isOpen, toggleDropdown }) => {
  return (
    <div className="job-dropdown" onMouseEnter={() => toggleDropdown(true)} onMouseLeave={() => toggleDropdown(false)}>
      <div className="job-btn" onClick={toggleDropdown}>
        <img src={Jobs_icon} alt="" className="job-icon" />
        <span className="label">
          <a href="index.html">Jobs</a>
        </span>
      </div>
      {isOpen && (
        <div className="dropdown-content">
          <a href="#">Create Job</a>
          <a href="#">View Jobs</a>
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
          <span className="label">
            <a href="index.html">Home</a>
          </span>
        </div>
        <div className="icon-container">
          <img src={Events_icon} alt="" className="icon" />
          <span className="label">
            <a href="index.html">Events</a>
          </span>
        </div>

        <JobDropdown isOpen={isOpen} toggleDropdown={toggleDropdown} />
      </div>
    </div>
  );
};

export default NavBar;
