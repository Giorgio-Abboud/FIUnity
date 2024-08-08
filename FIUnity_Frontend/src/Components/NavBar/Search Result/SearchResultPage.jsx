import "./SearchResult.css";
import React from "react";
import { useLocation } from "react-router-dom";

const SearchResultPage = () => {
  const location = useLocation();
  const { searchResults, searchTerm } = location.state || {
    searchResults: [],
    searchTerm: "",
  };

  return (
    <div>
      <h1 className="search-result-name">Search Results for "{searchTerm}":</h1>
      <p className="result-found">100 results found</p>
      <div className="search-division"></div>
      {searchResults && searchResults.length > 0 ? (
        <div className="flex-search-result-container">
          {searchResults.map((user, index) => (
            <div className="search-item-container" key={index}>
              <img
                src={user.profilePic}
                alt="Profile"
                className="search-pic"
              />
              <div>
                <h2>{user.fullName}</h2>
                <p className="search-class">{user.classification}</p>
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
