import "./Post.css";
import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";
import { BiRepost } from "react-icons/bi";
import axios from "axios";

export default function FinalPost({
  postId,
  firstName,
  lastName,
  classification,
  description,
  imgUrl,
  timestamp,
  comments,
  onCommentSubmit,
}) {
  const [userInput, setUserInput] = useState("");

  const handleCommentSubmit = async () => {

    const currDate = new Date().toLocaleDateString();
    const currTime = new Date().toLocaleTimeString();

    const currentDateTime = new Date().toISOString().slice(0, 19).replace("T", " ");

    const commentData = {
      post: postId,
      user: 1,
      first_name: firstName,
      last_name: lastName,
      text: userInput,
      created_at: currentDateTime,
    };
    console.log('commentData')
    console.log(commentData)
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/feed/comments/",
        commentData,
        {
          headers: {
            "Content-Type": "application/json",
            mode: "cors",
          },
        }
      );
      // console.log("Comment submitted:", response.data);
      setUserInput("");
      if (onCommentSubmit) {
        console.log(response.data)
        onCommentSubmit(postId, commentData);
      }
    } catch (error) {
      // console.error("Failed to submit comment:", error);
    }
  };
  // console.log(comments);
  return (
    <div className=" final-post-box font">
      <div className="name-container">
        <div>
          <div className="time-container">
            <div className="name">
              {firstName} {lastName}
            </div>
            <div className="time-stamps homepage-time-font">
              Posted on: {timestamp}
            </div>
          </div>
          <div className="classification">{classification}</div>
        </div>
      </div>
      <p className="homepage-font">{description}</p>
      <div>
        <img
          src={imgUrl || "/images/roary-post-img.png"}
          alt="post picture"
          className="post-pic"
        />
      </div>
      <div className="post-features icon-cursor">
        <div className="Post-icon-color homepage-font">
          <AiOutlineLike /> Like
        </div>
        <div className="Post-icon-color homepage-font">
          <FaRegCommentAlt /> Comment
        </div>
        <div className="Post-icon-color homepage-font">
          <IoShareOutline /> Share
        </div>
        <div className="Post-icon-color homepage-fonta">
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
        <button className="post-button" onClick={handleCommentSubmit}>
          Post
        </button>
      </div>
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="comment-post-box font">
            <div className="time-container">
              <p className="name">
                {comment.first_name} {comment.last_name}
              </p>
              <div className="time-stamps homepage-time-font">
                Posted on: {comment.created_at}
              </div>
            </div>
            <p className="comment-descript">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
