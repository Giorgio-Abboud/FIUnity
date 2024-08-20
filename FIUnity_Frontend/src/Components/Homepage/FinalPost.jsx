import "./Post.css";
import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";
import { MdOutlineReportGmailerrorred, MdDelete } from "react-icons/md";
import { BiRepost } from "react-icons/bi";
import axios from "axios";
import defaultProfilePicture from "../../assets/Default_pfp.png"; // Ensure this path is correct


export default function FinalPost({
  postId,
  firstName,
  lastName,
  posterFullName,
  posterClassification,
  userClassification,
  description,
  image,
  timestamp,
  comments,
  onCommentSubmit,
  no_of_comment,
  profilePicture,
}) {
  console.log("Received Classification:", userClassification);
  const [userInput, setUserInput] = useState("");
  const [postLikesCount, setPostLikesCount] = useState(0);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [adjustedTimestamp, setAdjustedTimestamp] = useState("");
  const [adjustedCommentTimestamps, setAdjustedCommentTimestamps] = useState(
    {}
  );
  const [isLiked, setIsLiked] = useState(false);
  const [commentLikes, setCommentLikes] = useState({});
  const [commentProfiles, setCommentProfiles] = useState({});
  const [profilePic, setProfilePic] = useState(defaultProfilePicture);
  const [userName, setUserName] = useState('');
  const [isPostAuthor, setIsPostAuthor] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  const [commentAuthors, setCommentAuthors] = useState({});

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/feed/posts/${postId}/`
        );
        setPostLikesCount(response.data.no_of_like);
        setIsLiked(response.data.is_liked);
        const profilePic = response.data.profile_picture || defaultProfilePicture;
        setProfilePic(profilePic);
        console.log("Post details fetched:", response.data);
      } catch (error) {
        console.error("Failed to fetch post details:", error);
      }
    };

    fetchPostDetails();
  }, [postId]);



  useEffect(() => {
    const firstName = localStorage.getItem("first_name");
    const lastName = localStorage.getItem("last_name");
    const fullName = `${firstName} ${lastName}`.trim();
    const userId = localStorage.getItem("user_id");

    setUserName(fullName);
    setCurrentUserId(userId);
  }, []);

  useEffect(() => {
    const adjustedTimestamp = adjustTimestampToTimeZone(timestamp);
    setAdjustedTimestamp(adjustedTimestamp);
  }, [timestamp]);

  useEffect(() => {
    // Check if the logged-in user is the author of each comment
    const commentAuthorsStatus = {};
    comments.forEach((comment) => {
      commentAuthorsStatus[comment.id] = comment.commenter_name === userName;
    });
    setCommentAuthors(commentAuthorsStatus);
  }, [comments, userName]);

  useEffect(() => {
    if (comments && comments.length > 0) {
      console.log("Comments data:", comments);

      const adjustedCommentTimestamps = {};
      comments.forEach((comment, index) => {
        const adjustedCommentTimestamp = adjustTimestampToTimeZone(comment.date);
        adjustedCommentTimestamps[index] = adjustedCommentTimestamp;
      });
      setAdjustedCommentTimestamps(adjustedCommentTimestamps);

      const initialCommentLikes = {};
      comments.forEach((comment) => {
        initialCommentLikes[comment.id] = comment.likes_count;
      });
      setCommentLikes(initialCommentLikes);

      // Add profile picture to comments
      const baseURL = "http://localhost:8000"; // Adjust as needed
      const updatedCommentProfiles = {};
      comments.forEach((comment) => {
        const profilePic = comment.commenter_profile_picture
          ? `${baseURL}${comment.commenter_profile_picture}`
          : defaultProfilePicture;
        updatedCommentProfiles[comment.id] = profilePic;

        // Log the profile picture URL for debugging
        console.log("Profile picture URL:", updatedCommentProfiles[comment.id]);
      });

      setCommentProfiles(updatedCommentProfiles);
    }
  }, [comments]);

  useEffect(() => {
    // Check if the logged-in user is the author of the post
    setIsPostAuthor(userName === posterFullName);
  }, [userName, posterFullName]);



  function adjustTimestampToTimeZone(timestamp) {
    const date = new Date(timestamp);
    const localTimeString = date.toLocaleString("en-US", {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return localTimeString;
  }

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
      setUserInput("");

      if (onCommentSubmit) {
        onCommentSubmit(postId, commentData);
      }
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  const handleLikeClick = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/feed/posts/${postId}/likePost/`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(isLiked ? "Unliked post" : "Liked post");
        setIsLiked(!isLiked);
        setPostLikesCount(response.data.likes_count);
      }
    } catch (error) {
      console.error("Error handling like click:", error);
    }
  };

  const handleCommentLikeClick = async (commentId) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/feed/comments/${commentId}/likeComment/`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedLikes = response.data.likes_count;
        setCommentLikes((prev) => ({
          ...prev,
          [commentId]: updatedLikes,
        }));
      }
    } catch (error) {
      console.error("Failed to like comment:", error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/feed/posts/${postId}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.status === 204) {
        console.log("Post deleted successfully");
        // Redirect or update the UI accordingly
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/feed/comments/${commentId}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.status === 204) {
        console.log("Comment deleted successfully");
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
      }
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <>
      <div className="final-post-box font">
        <div className="delete-post-container">
          {isPostAuthor && (
            <button className="icon-button" onClick={handleDeletePost}>
              <MdDelete />
            </button>
          )}
        </div>
        <button className="icon-button">
          <div className="report-final">
            <MdOutlineReportGmailerrorred />
          </div>
        </button>
        <div className="time-container">
          <div className="profile-pic-flex">
            <div className="profile-pic">
              <img
                src={profilePicture}
                alt="Profile"
                onError={() => setProfilePic(defaultProfilePicture)}
              />
            </div>
            <div>
              <div className="name">
                {posterFullName}
              </div>
              <div className="classification">{`${posterClassification === "Alumni" ? "Alum" : posterClassification}`}{" "}</div>
            </div>
          </div>
          <div className="homepage-time-font">
            Posted on: {adjustedTimestamp}
          </div>
        </div>
        {image && <img src={image} className="post-pic" />}
        <p className="post-text">{description}</p>
        <div className="post-features icon-cursor">
          <div className="Post-icon-color" onClick={handleLikeClick}>
            {postLikesCount}
            <AiOutlineLike />
            Like
          </div>
          <div className="Post-icon-color" onClick={handleCommentIconClick}>
            {no_of_comment}
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

        {showCommentSection && (
          <>
            <div className="comment-flex">
              <div>
                <div className="comment-name">
                  {userName}
                </div>
                <div className="classification-comment">{`${userClassification === "Alumni" ? "Alum" : userClassification}`}{" "}</div>
              </div>
              <textarea
                className="comment scrollbar"
                value={userInput}
                onChange={(event) => setUserInput(event.target.value)}
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
                  .map((comment, index) => (
                    <div key={index} className="comment-post-box font">
                      <div className="time-container">
                        <div className="comment-profile-pic">
                          <img
                            src={commentProfiles[comment.id] || defaultProfilePicture}
                            alt="Profile"
                            onError={(e) => e.target.src = defaultProfilePicture}
                          />
                        </div>
                        <div>
                          <p className="comment-name">
                            {comment.commenter_name}
                          </p>
                          <div className="classification-comment">
                            {`${comment.commenter_status === "Alumni" ? "Alum" : comment.commenter_status}`}{" "}
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
                      <p className="comment-descript">{comment.comment}</p>
                      <div className="delete-comment-container">
                        <div
                          className="Post-icon-color icon-cursor"
                          onClick={() => handleCommentLikeClick(comment.id)}
                        >
                          {commentLikes[comment.id]}
                          <AiOutlineLike />
                          Like
                        </div>
                        {commentAuthors[comment.id] && (
                          <div
                            className="icon-box"
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            <MdDelete />
                          </div>
                        )}
                      </div>
                    </div>
                  ))
              ) : (
                <p>No comments yet.</p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
