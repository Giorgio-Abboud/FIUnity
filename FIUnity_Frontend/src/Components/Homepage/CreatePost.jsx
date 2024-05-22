import "./Post.css";
import { useEffect, useState } from "react";
import { SlPicture } from "react-icons/sl";
import { FaRegCalendarAlt } from "react-icons/fa";
import axios from "axios";

export default function CreatePost({ firstName, lastName }) {
  const [userInput, setUserInput] = useState("");

  const handleIconClick = () => {
    document.getElementById("dockpicker").click();
  };

  const handleSubmit = async () => {
    const currentDateTime = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const postData = {
      user: 1,
      description: userInput,
      created_at: currentDateTime,
      comment_count: 0,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/feed/posts/",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            mode: "cors",
            // Add Authorization header if needed
          },
        }
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
