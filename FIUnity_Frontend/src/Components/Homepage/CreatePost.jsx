import "./Post.css";
import { useState } from "react";
import { SlPicture } from "react-icons/sl";
import { FaRegCalendarAlt } from "react-icons/fa";
import axios from "axios";

export default function CreatePost({ firstName, lastName, onPostSubmit }) {
  const [userInput, setUserInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleIconClick = () => {
    document.getElementById("dockpicker").click();
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    
    const currentDateTime = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const formData = new FormData();

    formData.append("user", 1);
    formData.append("description", userInput);
    formData.append("created_at", currentDateTime);

    if (selectedFile) {
      formData.append("images", selectedFile); // Add the file to form data
    }
    

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/feed/posts/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
            mode: "cors",
          },
        }
      );
      console.log("Post submitted:", response.data);
      setUserInput("");
      setSelectedFile(null); // Reset file input after submission
      if (onPostSubmit) {
        onPostSubmit(response.data);
      }
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
              <div className="homepage-font" onClick={handleIconClick}>
                <input
                  type="file"
                  id="dockpicker"
                  accept=".png,.jpg,.jpeg,.mp4,.mov,.avi"
                  onChange={handleFileChange}
                />
                <SlPicture />
                Media
              </div>
              <div className="homepage-font">
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
