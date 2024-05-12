import "./Post.css";
import { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";
import { BiRepost } from "react-icons/bi";

export default function FinalPost({
  name,
  classification,
  description,
  imgUrl,
  profilePic1,
  profilePic,
}) {
  const [userInput, setUserInput] = useState("");
  return (
    <div className=" final-post-box font">
      <div className="name-container">
        <img src={profilePic1} alt="profile picture" className="profile-pic-1" />
        <div>
          <span className="name">{name}</span>
          <br />
          <span className="classification">{classification}</span>
        </div>
      </div>
      <p>{description}</p>
      <div>
        <img src={imgUrl} alt="post picture" className="post-pic" />
      </div>
      <div className="post-features">
        <span>
          <AiOutlineLike /> Like
        </span>
        <span>
          <FaRegCommentAlt /> Comment
        </span>
        <span>
          <IoShareOutline /> Share
        </span>
        <span>
          <BiRepost /> Repost
        </span>
      </div>
      <div className="comment-flex">
        <img src={profilePic} alt="profile picture" className="profile-pic-2" />
        <textarea
          className="comment scrollbar"
          value={userInput}
          onChange={(event) => {
            setUserInput(event.target.value);
          }}
          placeholder="Add a comment..."
        />
        <button className="post-button">Post</button>
      </div>
    </div>
  );
}
