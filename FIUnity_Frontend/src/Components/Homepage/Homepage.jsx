import FinalPost from "./FinalPost";
import React, { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
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
  return (
    <>
      <CreatePost
        firstName={"Roary"}
        lastName={"Royce"}
        // setTimestamp={setTimestamp}
      />
      {allPosts.map(
        ({ first_name, last_name, description, image, created_at }) => (
          <FinalPost
            firstName={first_name}
            lastName={last_name}
            description={description}
            classification={"Student"}
            imgUrl={image}
            timestamp={created_at}
          />
        )
      )}
    </>
  );
}

export default Homepage;
