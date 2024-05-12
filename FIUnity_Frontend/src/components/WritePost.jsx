import "./Post.css";
import { useState } from "react";
import { SlPicture } from "react-icons/sl";
import { FaRegCalendarAlt } from "react-icons/fa";

export default function WritePost({ profilePic1 }) {
  const [userInput, setUserInput] = useState("");
  const handleIconClick = () => {
    document.getElementById("dockpicker").click();
  };
  return (
    <>
      <div className="large-post-box font">
        <img src={profilePic1} alt="profile picture" className="profile-pic" />
        <div className="text-area-container">
          <textarea
            className="text-box scrollbar"
            value={userInput}
            onChange={(event) => {
              setUserInput(event.target.value);
            }}
            placeholder="Type here..."
          />
          <div className="icon-button-style">
            <div className="icon icon-cursor">
              <span onClick={handleIconClick}>
                <input type="file" id="dockpicker" accept=".png,.jpg" />
                <SlPicture />
                Media
              </span>
              <span>
                <FaRegCalendarAlt />
                Event
              </span>
            </div>
            <button className="post-button">Submit post</button>
          </div>
        </div>
      </div>
      <div className="line"></div>
    </>
  );
}
