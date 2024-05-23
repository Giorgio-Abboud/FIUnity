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
  imagesData,
  timestamp,
  comments,
  onCommentSubmit,
}) {
  const [userInput, setUserInput] = useState("");
  console.log(imagesData);
  const handleCommentSubmit = async () => {
    const currentDateTime = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const commentData = {
      post: postId,
      user: 1,
      first_name: firstName,
      last_name: lastName,
      text: userInput,
      created_at: currentDateTime,
    };
    console.log("commentData");
    console.log(commentData);
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
        console.log(response.data);
        onCommentSubmit(postId, commentData);
      }
    } catch (error) {
      // console.error("Failed to submit comment:", error);
    }
  };
  // console.log(comments);
  return (
    <>
      {console.log("Image Data:", imagesData)}
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
          src={imagesData}
          className="post-pic"
          alt=""
        />
          {/* {imagesData && (
            <div>
              <img src={imagesData} className="post-pic"/>
            </div>
          )} */}
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
          <div className="Post-icon-color homepage-font">
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
          {/* {comments
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((comment) => (
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
          ))} */}
          {comments && comments.length > 0 ? (
            comments
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((comment) => (
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
              ))
          ) : (
            <p className="no-comment homepage-font">
              Be the first to comment...
            </p>
          )}
        </div>
      </div>
    </>
  );
}
