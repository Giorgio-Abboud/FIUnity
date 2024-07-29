import FinalPost from "./FinalPost";
import React, { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import axios from "axios";

function Homepage() {
  const [allPosts, setAllPosts] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get("http://127.0.0.1:8000/feed/posts/", {
          headers: {
            "Content-Type": "application/json",
            mode: "cors",
          },
        });

        const first_name = localStorage.getItem("first_name");
        const last_name = localStorage.getItem("last_name");
        console.log("response", response);

        setFirstName(first_name);
        setLastName(last_name);
        setAllPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    })();
  }, []);

  const handlePostSubmit = (newPost) => {
    setAllPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleCommentSubmit = (postId, newComment) => {
    newComment = {
      created_at: new Date().toISOString(),
      first_name: firstName,
      last_name: lastName,
      text: newComment.text,
    };
    console.log("Updated posts:", allPosts);
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

  return (
    <>
      <CreatePost
        firstName={firstName}
        lastName={lastName}
        classification={"Student"}
        onPostSubmit={handlePostSubmit}
      />
      {allPosts
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map(
          ({ id, body, date, comments, likes_count, no_of_comment, image }) => (
            <FinalPost
              key={id}
              postId={id}
              firstName={firstName}
              lastName={lastName}
              description={body}
              classification={"Student"}
              image={image || ""}
              likesCount={likes_count}
              timestamp={date}
              no_of_comment={no_of_comment}
              comments={comments}
              onCommentSubmit={handleCommentSubmit}
            />
          )
        )}
    </>
  );
}

export default Homepage;
