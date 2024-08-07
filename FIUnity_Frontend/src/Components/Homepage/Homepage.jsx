import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClockLoader } from "react-spinners";
import CreatePost from "./CreatePost";
import FinalPost from "./FinalPost";
import defaultProfilePicture from "../../assets/Default_pfp.png";

const Homepage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [forcedLoading, setForcedLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profile data
        const profileResponse = await axios.get(
          "http://localhost:8000/profile/mainpage/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        const profilePic = profileResponse.data.profile.picture || defaultProfilePicture;
        setProfileData(profilePic);
        // Fetch posts data
        const postsResponse = await axios.get("http://127.0.0.1:8000/feed/posts/", {
          headers: {
            "Content-Type": "application/json",
            mode: "cors",
          },
        });

        const first_name = localStorage.getItem("first_name");
        const last_name = localStorage.getItem("last_name");

        setFirstName(first_name);
        setLastName(last_name);
        setAllPosts(postsResponse.data);

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();

    const timer = setTimeout(() => {
      setForcedLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading || forcedLoading) {
    return (
      <div className="loader-container">
        <ClockLoader loading={loading || forcedLoading} size={100} color="#081e3f" />
      </div>
    );
  }

  const handlePostSubmit = (newPost) => {
    setAllPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleCommentSubmit = (postId, newComment) => {
    newComment = {
      created_at: new Date().toISOString(),
      first_name: firstName,
      last_name: lastName,
      text: newComment.text,
      profilePicture: profileData || defaultProfilePicture,
      
    };
    setAllPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...(post.comments || []), newComment],
              comments_count: (post.comments_count || 0) + 1,
            }
          : post
      )
    );
  };

  const handleLikeSubmit = async (postId) => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/feed/posts/${postId}/likePost/`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      setAllPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes_count: (post.likes_count || 0) + 1,
              }
            : post
        )
      );
    } catch (error) {
      console.error("Failed to like the post:", error);
    }
  };

  return (
    <>
      <CreatePost
        firstName={firstName}
        lastName={lastName}
        classification={"Student"}
        onPostSubmit={handlePostSubmit}
        profilePic={profileData || defaultProfilePicture}
      />
      {allPosts
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map(
          ({ id, body, date, comments, likes_count, no_of_comment, image, poster_full_name, poster_picture }) => (
            <FinalPost
              key={id}
              postId={id}
              posterFullName={poster_full_name}
              description={body}
              classification={"Student"}
              image={image || ""}
              likesCount={likes_count}
              timestamp={date}
              no_of_comment={no_of_comment}
              comments={comments}
              onCommentSubmit={handleCommentSubmit}
              profilePicture={poster_picture || defaultProfilePicture}
            />
          )
        )}
    </>
  );
};

export default Homepage;
