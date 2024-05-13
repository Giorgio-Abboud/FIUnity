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
}) {
  const [userInput, setUserInput] = useState("");
  return (
    <div className=" final-post-box font">
      <div className="name-container">
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
        <span className="name">{name}</span>
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
