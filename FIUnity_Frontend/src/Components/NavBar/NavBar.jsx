import React, { useState } from "react";
import "./NavBar.css";
import Logo_icon from "../../assets/FIUnity-Logo 3.png";
import Pawprint_icon from "../../assets/paw print.png";
import Newsfeed_icon from "../../assets/Newsfeed icon.png";
import Jobs_icon from "../../assets/Jobs icon.png";
import Profile_icon from "../../assets/Profile icon.png";
import axios from "./axiosInstance";
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

const dummySearchData = [
  {
    firstName: "Roary",
    lastName: "Royce",
    classification: "Student",
    profilePic: "/images/roary-profile-pic.jpg",
  },
  {
    firstName: "Marshall",
    lastName: "Mathers",
    classification: "Alumni",
    profilePic: "/images/roary-profile-pic.jpg",
  },
  {
    firstName: "Marshall",
    lastName: "Smith",
    classification: "Student",
    profilePic: "/images/roary-profile-pic.jpg",
  },
  {
    firstName: "Marshall",
    lastName: "Smith",
    classification: "Student",
    profilePic: "/images/roary-profile-pic.jpg",
  },
  {
    firstName: "Marshall",
    lastName: "Smith",
    classification: "Student",
    profilePic: "/images/roary-profile-pic.jpg",
  },
  {
    firstName: "Marshall",
    lastName: "Smith",
    classification: "Student",
    profilePic: "/images/roary-profile-pic.jpg",
  },
  {
    firstName: "Marshall",
    lastName: "Smith",
    classification: "Student",
    profilePic: "/images/roary-profile-pic.jpg",
  },
  {
    firstName: "Chris",
    lastName: "Hemsworth",
    classification: "Alumni",
    profilePic: "/images/roary-profile-pic.jpg",
  },
];

const NavBar = () => {
  const [isSearchBold, setIsSearchBold] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearchClick = () => {
    setIsSearchBold(true);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (value) {
      const results = dummySearchData.filter((user) =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(value.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const searchBarInfo = {
      searchBarInput: searchInput,
    };

    axios
      .post("http://localhost:8000/authentication/user/", searchBarInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("User found");
          console.log("this is the response:", response);
          window.location.href = `http://localhost:5173/view-profile/${response.data.user_id}`;
        } else {
          console.error("User cannot be found");
          setErrorMessage("User cannot be found.");
        }
      })
      .catch((error) => {
        console.error("Error sending search for user request:", error);
        setErrorMessage(
          "An error occurred while searching for user. Please try again later."
        );
      });
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
          <form onSubmit={handleSubmit} className= "searchInputNavBar">
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={handleSearchChange}
            />
          </form>
          <div className="navBarSubmit">
            <button type="submit">
              <img src={Pawprint_icon} alt="Paw Print Icon" className="pawprint-icon" />
            </button>
            </div>
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
            <div key={index} className="search-result">
              <div className="search-result-text">
                <div className="bold-search">{`${user.firstName} ${user.lastName}`}</div>
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
