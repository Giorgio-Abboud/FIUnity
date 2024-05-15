import "./Post.css";
import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";
import { BiRepost } from "react-icons/bi";
// import axios from "axios";

export default function FinalPost({
  firstName,
  lastName,
  classification,
  description,
  imgUrl,
  timestamp,
}) {
  const [userInput, setUserInput] = useState("");
  return (
    <div className=" final-post-box font">
      <div className="name-container">
        <div>
          <div className="time-container">
            <span className="name">
              {firstName} {lastName}
            </span>
            <span className="time-stamp">Posted on: {timestamp}</span>
          </div>
          <span className="classification">{classification}</span>
        </div>
      </div>
      <p>{description}</p>
      <div>
        <img src={imgUrl} alt="post picture" className="post-pic" />
      </div>
      <div className="post-features icon-cursor">
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
        <span className="name">
          {firstName} {lastName}
        </span>
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
