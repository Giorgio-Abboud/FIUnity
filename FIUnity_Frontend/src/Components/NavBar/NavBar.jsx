import React, { useState } from "react";
import "./NavBar.css";
import Logo_icon from "../../assets/FIUnity-Logo 3.png";
import Pawprint_icon from "../../assets/paw print.png";
import Newsfeed_icon from "../../assets/Newsfeed icon.png";
import Jobs_icon from "../../assets/Jobs icon.png";
import Profile_icon from "../../assets/Profile icon.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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

const fetchProfiles = async (searchTerm, loggedInUserEmail) => {    
  console.log('Fetching profiles with search term:', searchTerm);
  try {
    const response = await axiosInstance.get('/search/', {
      params: { search: searchTerm } 
    });

    console.log('response:', response.data);

    const mappedResults = response.data
    .filter(profile => profile.email !== loggedInUserEmail) 
    .map(profile => ({
      fullName: profile.full_name, 
      classification: profile.check_graduation_status,
      profilePic: profile.picture,
      profileUrl: profile.profile_url,
      gradTerm: profile.grad_term,
      gradYear: profile.graduation_year,
      major: profile.major,
      currJob: profile.current_job_title
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
  const loggedInUserEmail = localStorage.getItem("user_id"); 
  return (
    <div
      className="profile-dropdown"
      onMouseEnter={() => toggleDropdown(true)}
      onMouseLeave={() => toggleDropdown(false)}
    >
      <div className="profile-btn" onClick={toggleDropdown}>
        <img src={Profile_icon} alt="Profile Icon" className="profile-icon" />
        <Link to={loggedInUserEmail ? "/view-profile" : "/profile/usermainpage/:userId"} className="nav-link">          Profile
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
  const [searchInput, setSearchInput] = useState(""); 
  const [searchResults, setSearchResults] = useState([]); 
  const [errorMessage, setErrorMessage] = useState("");
  const loggedInUserEmail = localStorage.getItem("user_id"); 
  const navigate = useNavigate();

  const handleSearchClick = () => {
    setIsSearchBold(true);
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (value) {
      try {
        const results = await fetchProfiles(value, loggedInUserEmail);
        setSearchResults(results);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = async () => {
    if (searchInput) {
      try {
        const results = await fetchProfiles(searchInput, loggedInUserEmail);
        console.log('result', results)
        navigate('/search-result', { state: { searchResults: results, searchTerm: searchInput } });
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  };

  const handleUserClick = (profileUrl) => {
    navigate(profileUrl);
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
            value={searchInput} // Updated
            onChange={handleSearchChange} // Updated
          />
          <button className="search-button" onClick={handleSearchSubmit}>
            <img src={Pawprint_icon} alt="Paw Print Icon" />
          </button>
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

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
            <div key={index} className="search-result" onClick={() => handleUserClick(user.profileUrl)}>
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
        </div>
      )}
    </>
  );
};

export default NavBar;
