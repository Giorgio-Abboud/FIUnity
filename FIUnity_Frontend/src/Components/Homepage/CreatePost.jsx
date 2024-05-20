import "./Post.css";
import { useEffect, useState } from "react";
import { SlPicture } from "react-icons/sl";
import { FaRegCalendarAlt } from "react-icons/fa";
import axios from "axios";

export default function CreatePost({ firstName, lastName }) {
  const [userInput, setUserInput] = useState("");
  const [datePosted, setDatePosted] = useState("");

  const handleIconClick = () => {
    document.getElementById("dockpicker").click();
  };

  const handleSubmit = async () => {
    const currentDateTime = new Date().toLocaleString();
    setDatePosted(currentDateTime);

    const postData = {
      description: userInput,
      datePosted: currentDateTime,
    };

    try {
      const response = await axios.post(
        "http://10.108.229.73:8000/writePost/",
        postData
      );
      console.log("Post submitted:", response.data);
      setUserInput("");
    } catch (error) {
      console.error("Failed to submit post:", error);
    }
  };
  return (
    <>
      <div className="large-post-box font">
        <div className="name">
          {firstName} {lastName}
        </div>
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
              <div onClick={handleIconClick}>
                <input type="file" id="dockpicker" accept=".png,.jpg" />
                <SlPicture />
                Media
              </div>
              <div>
                <FaRegCalendarAlt />
                Event
              </div>
            </div>
            <button onClick={handleSubmit} className="post-button">
              Submit post
            </button>
          </div>
        </div>
      </div>
      <div className="Post-line"></div>
    </>
  );
}
