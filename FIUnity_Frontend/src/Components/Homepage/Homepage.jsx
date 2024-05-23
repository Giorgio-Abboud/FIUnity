import FinalPost from "./FinalPost";
import React, { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import axios from "axios";

function Homepage() {
  const [allPosts, setAllPosts] = useState([]);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  useEffect(() => {
    (async function () {
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
    console.log(postId, newComment, "look at me");
    console.log(newComment.created_at)
    newComment = {
      created_at: newComment["created_at"],
      first_name: firstName,
      last_name: lastName,
      text: newComment.text,
    };
    
    setAllPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [newComment, ...post.comments] }
          : post
      )
    );
  };
  console.log(allPosts)
  return (
    <>
      <CreatePost
        firstName={"Roary"}
        lastName={"Royce"}
        onPostSubmit={handlePostSubmit}
      />
      {allPosts.map(
        ({
          id,
          first_name,
          last_name,
          description,
          image,
          created_at,
          comments,
        }) => (
          <FinalPost
            key={id}
            postId={id}
            firstName={first_name}
            lastName={last_name}
            description={description}
            classification={"Unknown"}
            imgUrl={image}
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
