import React, { useState } from "react";
import "./NavBar.css";
import Logo_icon from "../../assets/FIUnity-Logo 3.png";
import Pawprint_icon from "../../assets/paw print.png";
import Newsfeed_icon from "../../assets/Newsfeed icon.png";
import Jobs_icon from "../../assets/Jobs icon.png";
import Profile_icon from "../../assets/Profile icon.png";
import { Link } from "react-router-dom";
import defaultProfilePicture from "../../assets/Default_pfp.png";
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/profile/',
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const fetchProfiles = async (searchTerm) => {
  try {
    const response = await axiosInstance.get('/search/', {
      params: { search: searchTerm } 
    });

    console.log('response:', response.data);

    const mappedResults = response.data.map(profile => ({
      fullName: profile.full_name, 
      classification: profile.check_graduation_status,
      profilePic: profile.picture || defaultProfilePicture
    }));

    console.log('Mapped search results:', mappedResults);
    return mappedResults;
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw error;
  }
};


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
          {/* <Link to="/profile-edit">Edit Profile</Link> */}
        </div>
      )}
    </div>
  );
};


const NavBar = () => {
  const [isSearchBold, setIsSearchBold] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(""); //NEW CODE
  const [searchResults, setSearchResults] = useState([]); //NEW CODE

  const handleSearchClick = () => {
    setIsSearchBold(true);
  };

  
  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (value) {
      try {
        const results = await fetchProfiles(value);
        setSearchResults(results);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="NavBar">
        <img src={Logo_icon} alt="FIUnity Logo" className="logo" />

        <div
          className={`searchBox ${isSearchBold ? "bold-search" : ""}`}
          onClick={handleSearchClick}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchInput} //NEW CODE
            onChange={handleSearchChange} //NEW CODE
          />
          <button className="search-button">
            <img src={Pawprint_icon} alt="Paw Print Icon" />
          </button>
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
      {searchResults.length > 0 && (
        <div className="search-dropdown">
          {searchResults.map((user, index) => (
            <div key={index} className="search-result">
              <div className="search-result-text">
                <div className="bold-search">{`${user.fullName}`}</div>
                <div className="search-result-status">
                  {user.classification}
                </div>
              </div>
              <img
                src={user.profilePic}
                alt="Profile"
                className="search-result-pic"
              />
            </div>
          ))}
        </div> //NEW CODE FROM SEARCH RESULTS...
      )}
    </>
  );
};

export default NavBar;
