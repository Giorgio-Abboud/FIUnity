import React from "react";
import "./SearchPage.css";
import { FaGripLines } from "react-icons/fa";

export default function SearchPage() {
  return (
    <div className="search-page">
      <img
        src="/images/fb9133c1-263a-4dc4-8931-37cd27c9ec4e.jpg"
        alt="Background"
      />
      <div className="search-text-container">
        <h1>
          CONNECT.
          <br />
          EMPOWER.
          <br />
          SUCCEED.
        </h1>
      </div>
      <div className="search-page-line">
        <div className="icon-container">
          <div className="search-icon-1"></div>
          <div className="search-icon-2"></div>
          <div className="search-icon-3"></div>
          <div className="search-text">
            Search for a fellow panther...
          </div>
        </div>
      </div>
    </div>
  );
}
