import "./SearchResult.css";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchResults, searchTerm } = location.state || {
    searchResults: [],
    searchTerm: "",
  };

  const handleUserClick = (profileUrl) => {
    navigate(profileUrl);
  };

  console.log('search results', searchResults)

  return (
    <div>
      <h1 className="search-result-name">Search Results for "{searchTerm}":</h1>
      <p className="result-found">
        {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} found
      </p>
      <div className="search-division"></div>
      {searchResults && searchResults.length > 0 ? (
        <div className="flex-search-result-container">
          {searchResults.map((user, index) => (
            <div
              className="search-item-container"
              key={index}
              onClick={() => handleUserClick(user.profileUrl)} 
            >
              <img
                src={user.profilePic}
                alt="Profile"
                className="search-pic"
              />
              <div>
                <h2>{user.fullName}</h2>
                <p className="search-class">{user.classification}</p>
                <p>{user.gradTerm} {user.gradYear}</p> 
                <p>{user.major}</p> 
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResultPage;
