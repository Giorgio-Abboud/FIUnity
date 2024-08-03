import "./Post.css";
import { useState } from "react";
import { SlPicture } from "react-icons/sl";
import { FaRegCalendarAlt } from "react-icons/fa";
import axios from "axios";

export default function CreatePost({
  firstName,
  lastName,
  classification,
  onPostSubmit,
}) {
  const [userInput, setUserInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [fileSuccessMessage, setFileSuccessMessage] = useState("");

  const handleIconClick = () => {
    document.getElementById("dockpicker").click();
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileSuccessMessage("");
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith("video")) {
        const video = document.createElement("video");
        video.preload = "metadata";

        video.onloadedmetadata = function () {
          window.URL.revokeObjectURL(video.src);
          const duration = video.duration;

          if (duration < 1 || duration > 20) {
            setFileError("Video must be between 1 and 20 seconds long.");
            setSelectedFile(null);
            setFileSuccessMessage("");
          } else {
            setFileError("");
            setSelectedFile(file);
            setFileSuccessMessage("File upload successful");
          }
        };
        video.src = URL.createObjectURL(file);
      } else {
        setFileError("");
        setSelectedFile(file);
        setFileSuccessMessage("File upload successful");
      }
    }
  };

  const handleSubmit = async () => {
    const currentDateTime = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const formData = new FormData();
    const userId = localStorage.getItem("user_id");
    formData.append("user", userId);
    formData.append("body", userInput);
    formData.append("created_at", currentDateTime);

    if (selectedFile) {
      formData.append("image", selectedFile); // Add the file to form data
    }

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const accessToken = localStorage.getItem("access_token");
    console.log("accesstoken", accessToken)
   
    try {
      const response = await axios.post(
        "http://127.0.0.1:8008/feed/posts/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${accessToken}`,
            mode: "cors",
          },
        }
      );
      console.log("Post submitted:", response.data);
      setUserInput("");
      setSelectedFile(null); // Reset file input after submission
      setFileSuccessMessage("");
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
        <div className="profile-pic-flex">
          <div className="profile-pic"></div>
          <div>
            <div className="name">
              {firstName} {lastName}
            </div>
            <div className="classification">{classification}</div>
          </div>
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
          {fileError && <p className="file-error">{fileError}</p>}
          {fileSuccessMessage && (
            <p className="file-success">{fileSuccessMessage}</p>
          )}
        </div>
      </div>
      <div className="Post-line"></div>
    </>
  );
}
