import { FaRegHeart } from "react-icons/fa";
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
  commentCount
}) {

  const [userInput, setUserInput] = useState("");
  const [postLikesCount, setPostLikesCount] = useState(0);
  const [commentLikesCount, setCommentLikesCount] = useState(0);
  const [showCommentSection, setShowCommentSection] = useState(false);

  console.log(imagesData);
  console.log(commentCount)

  const [adjustedTimestamp, setAdjustedTimestamp] = useState("");
  const [adjustedCommentTimestamps, setAdjustedCommentTimestamps] = useState({});

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
      hour12: true
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
      comments.forEach((comment) => {
        const adjustedCommentTimestamp = adjustTimestampToTimeZone(comment.created_at);
        adjustedCommentTimestamps[comment.id] = adjustedCommentTimestamp;
      });
      setAdjustedCommentTimestamps(adjustedCommentTimestamps);
    }
  }, [comments]);
  const handleCommentIconClick = () => {
    setShowCommentSection(!showCommentSection);
  };

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
              <div className="time-stamp-post homepage-time-font final-post-time-stamp">
                Posted on: {adjustedTimestamp}
              </div>
            </div>
            <div className="classification">{classification}</div>
          </div>
        </div>
        <p className="homepage-font">{description}</p>
        <div className="post-features icon-cursor">
          <div className="Post-icon-color homepage-font">
            {postLikesCount}<AiOutlineLike />
            Like
          </div>
          <div
            className="Post-icon-color homepage-font"
            onClick={() => setShowCommentSection(!showCommentSection)}
          >
            {commentCount}<FaRegCommentAlt />Comment
          </div>
          <div className="Post-icon-color homepage-font">
            <IoShareOutline /> Share
          </div>
          <div className="Post-icon-color homepage-font">
            <BiRepost /> Repost
          </div>
        </div>


        {showCommentSection && (
          <>
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
              {comments && comments.length > 0 ? (
                comments
                  .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                  )
                  .map((comment) => (
                    <div key={comment.id} className="comment-post-box font">
                      <div className="time-container">
                        <p className="name">
                          {comment.first_name} {comment.last_name}
                        </p>
                        <div className="time-stamp-comment homepage-time-font">
                          Posted on: {adjustedCommentTimestamps[comment.id]}
                        </div>
                      </div>
                      <p className="comment-descript">{comment.text}</p>
                      <div className="Post-icon-color homepage-font">
                        {commentLikesCount} <AiOutlineLike />
                      </div>
                    </div>
                  ))
              ) : (
                <p className="no-comment homepage-font">
                  Be the first to comment...
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
