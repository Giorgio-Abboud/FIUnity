import "./Post.css";
import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";
import { BiRepost } from "react-icons/bi";

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
            <div className="name">
              {firstName} {lastName}
            </div>
            <div className="time-stamps">
                Posted on: {timestamp}
            </div>
          </div>
          <div className="classification">{classification}</div>
        </div>
      </div>
      <p>{description}</p>
      <div>
        <img src={imgUrl} alt="post picture" className="post-pic" />
      </div>
      <div className="post-features icon-cursor">
        <div className="Post-icon-color">
          <AiOutlineLike /> Like
        </div>
        <div className="Post-icon-color">
          <FaRegCommentAlt /> Comment
        </div>
        <div className="Post-icon-color">
          <IoShareOutline /> Share
        </div>
        <div className="Post-icon-color">
          <BiRepost /> Repost
        </div>
      </div>
      <div className="comment-flex">
        <div className="name">
          {firstName} {lastName}
        </div>
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
