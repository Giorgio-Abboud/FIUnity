import FinalPost from "./FinalPost";
import React, { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import axios from "axios";

function Homepage() {
  const [allPosts, setAllPosts] = useState([{comments:[]}]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    (async function () {
      const first_name = localStorage.getItem("first_name");
      const last_name = localStorage.getItem("last_name");
console.log('name:', firstName, lastName)
      setFirstName(first_name);
      setLastName(last_name);
      try {
        const response = await axios.get("http://127.0.0.1:8000/feed/feed/", {
          headers: {
            "Content-Type": "application/json",
            mode: "cors",
          },
        });
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
    // console.log(postId, newComment, "look at me");
    // console.log(newComment.created_at);
    newComment = {
      created_at: newComment["created_at"],
      first_name: firstName,
      last_name: lastName,
      text: newComment.text,
    };
    console.log(allPosts)
    setAllPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments:[...(post.comments || []), newComment]}
          : post
      )
    );
  };
  console.log(allPosts);

  // first_name = "Roary";
  // last_name = "Royce";
  return (
    <>
      <CreatePost
        firstName={firstName}
        lastName={lastName}
        onPostSubmit={handlePostSubmit}
      />
      {allPosts
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map(
          ({
            id,
            description,
            created_at,
            comments,
          }) => (
            <FinalPost
              key={id}
              postId={id}
              firstName={firstName}
              lastName={lastName}
              description={description}
              classification={"Student"}
              imagesData={"http://127.0.0.1:8000/feed/image/" + id}
              timestamp={created_at}
              comments={comments}
              onCommentSubmit={handleCommentSubmit}
            />
          )
        )}
    </>
  );
}

export default Homepage;
