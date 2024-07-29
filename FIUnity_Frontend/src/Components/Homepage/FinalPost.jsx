import "./Post.css";
import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { BiRepost } from "react-icons/bi";

import axios from "axios";

export default function FinalPost({
  postId,
  firstName,
  lastName,
  classification,
  description,
  image,
  timestamp,
  comments,
  onCommentSubmit,
  no_of_comment,
}) {
  const [userInput, setUserInput] = useState("");
  const [postLikesCount, setPostLikesCount] = useState(0);
  const [commentLikesCount, setCommentLikesCount] = useState(0);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [posts, setPosts] = useState([]);

  const [adjustedTimestamp, setAdjustedTimestamp] = useState("");
  const [adjustedCommentTimestamps, setAdjustedCommentTimestamps] = useState(
    {}
  );

  function adjustTimestampToTimeZone(timestamp) {
    const date = new Date(timestamp);
    const offsetInMinutes = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offsetInMinutes);

    const options = {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const adjustedTimestamp = date.toLocaleString(undefined, options);
    return adjustedTimestamp;
  }

  useEffect(() => {
    // Adjust the timestamp for display
    const adjustedTimestamp = adjustTimestampToTimeZone(timestamp);
    setAdjustedTimestamp(adjustedTimestamp); // Set the adjusted timestamp in state
  }, [timestamp]);

  useEffect(() => {
    if (comments && comments.length > 0) {
      const adjustedCommentTimestamps = {};
      comments.forEach((comment, index) => {
        const adjustedCommentTimestamp = adjustTimestampToTimeZone(
          comment.created_at
        );
        adjustedCommentTimestamps[index] = adjustedCommentTimestamp;
      });
      setAdjustedCommentTimestamps(adjustedCommentTimestamps);
    }
  }, [comments]);

  const handleCommentIconClick = () => {
    setShowCommentSection(!showCommentSection);
  };

  const handleCommentSubmit = async () => {
    if (!userInput.trim()) {
      alert("Comment cannot be empty");
      return;
    }

    const currentDateTime = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const user_id = localStorage.getItem("user_id");

    const commentData = {
      post_id: postId,
      user_id: user_id,
      comment: userInput,
      date: currentDateTime,
    };

    console.log("commentData");
    console.log(commentData);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/feed/posts/${postId}/comment/`,
        commentData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log("Comment submitted:", response.data);
      setUserInput("");

      if (onCommentSubmit) {
        console.log(response.data);
        onCommentSubmit(postId, commentData);
      }
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  const handleLikeClick = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/posts/${postId}/likePost/`, 
        null,
        {
          headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.status === 200) {
        setPostLikesCount((prevCount) => response.data.likes_count); // Update like count
      }
    } catch (error) {
      console.error("Failed to like the post:", error);
    }
  };

  return (
    <>
      <div className=" final-post-box font">
        <button className="icon-button">
          <div className="report-final">
            <MdOutlineReportGmailerrorred />
          </div>
        </button>
        <div className="time-container">
          <div className="profile-pic-flex">
            <div className="profile-pic"></div>
            <div>
              <div className="name">
                {firstName} {lastName}
              </div>
              <div className="classification">{classification}</div>
            </div>
          </div>
          <div className="homepage-time-font">
            Posted on: {adjustedTimestamp}
          </div>
        </div>
        {image && <img src={image} className="post-pic" />}
        <p className="post-text">{description}</p>
        <div className="delete-comment-container">
          <div className="post-features icon-cursor">
            <div className="Post-icon-color" onClick={handleLikeClick}>
              {postLikesCount}
              <AiOutlineLike />
              Like
            </div>
            <div
              className="Post-icon-color"
              onClick={() => setShowCommentSection(!showCommentSection)}
            >
              {no_of_comment              }
              <FaRegCommentAlt />
              Comment
            </div>
            <div className="Post-icon-color">
              <IoShareOutline /> Share
            </div>
            <div className="Post-icon-color">
              <BiRepost /> Repost
            </div>
          </div>
          <div>
            <button className="icon-button">
              <div>
                <MdDelete />
              </div>
            </button>
          </div>
        </div>

        {showCommentSection && (
          <>
            <div className="comment-flex">
              <div>
                <div className="comment-name">
                  {firstName} {lastName}
                </div>
                <div className="classification-comment">{classification}</div>
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
              {console.log(
                "Adjusted Comment Timestamps:",
                adjustedCommentTimestamps
              )}
              {comments && comments.length > 0 ? (
                comments
                  .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                  )
                  .map((comment, index) => (
                    <div key={index} className="comment-post-box font">
                      <div className="time-container">
                        <div className="comment-profile-pic"></div>
                        <div>
                          <p className="comment-name">
                            {comment.commenter_name}
                          </p>
                          <div className="classification-comment">
                            {classification}
                          </div>
                        </div>
                        <button className="icon-button">
                          <div className="report-comment">
                            <MdOutlineReportGmailerrorred />
                          </div>
                        </button>
                        <div className="time-stamp-comment homepage-time-font">
                          Posted on: {adjustedCommentTimestamps[index]}
                        </div>
                      </div>
                      <div className="comment-text-container scrollbar">
                        <p className="comment-descript">{comment.comment}</p>
                      </div>
                      <div className="delete-comment-container">
                        <div className="Post-icon-color ">
                          {commentLikesCount} <AiOutlineLike />
                        </div>
                        <button className="icon-button">
                          <div>
                            <MdDelete />
                          </div>
                        </button>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="no-comment">Be the first to comment...</p>
              )}
            </div>
          </>
        )}
        {/* <>
          <div className="comment-flex">
            <div>
              <div className="comment-name">
                {firstName} {lastName}
              </div>
              <div className="classification-comment">{classification}</div>
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
            {console.log(
              "Adjusted Comment Timestamps:",
              adjustedCommentTimestamps
            )}
            <div className="comment-post-box font">
              <div className="time-container">
                <div className="comment-profile-pic"></div>
                <div>
                  <p className="comment-name">Rafe Cameron</p>
                  <div className="classification-comment">{classification}</div>
                </div>
                <button className="icon-button">
                  <div className="report-comment">
                    <MdOutlineReportGmailerrorred />
                  </div>
                </button>
                <div className="time-stamp-comment homepage-time-font">
                  Posted on: 12:20:22 EST
                </div>
              </div>
              <div className="comment-text-container scrollbar">
                <p className="comment-descript"></p>
              </div>
              <div className="delete-comment-container">
                <div className="Post-icon-color homepage-font ">
                  {commentLikesCount} <AiOutlineLike />
                </div>
                <button className="icon-button">
                  <div>
                    <MdDelete />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </> */}
      </div>
    </>
  );
}
