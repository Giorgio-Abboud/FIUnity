import FinalPost from "./FinalPost";
import React, { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import Comments from "./Comments";
import axios from "axios";

function Homepage() {
  // const [writePost, setWritePost] = useState("")
  // const getWritePost = () => {
  //   axios
  //     .get("http://10.108.229.73:8000/writePost/")
  //     .then(res => {console.log(res.data.content) setWritePost(res.data.content)})
  //     .catch(err => {consol.log(err)});
  // };

  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await axios.get("http://127.0.0.1:8000/feed/feed/", {
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
        },
      });

      setAllPosts(response.data);
    })();
  }, []);

  const handlePostSubmit = (newPost) => {
    setAllPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleCommentSubmit = (postId, newComment) => {
    setAllPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [newComment, ...post.comments] }
          : post
      )
    );
  };

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
            post={id}
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
      {/* <Comments/> */}
    </>
  );
}

export default Homepage;
