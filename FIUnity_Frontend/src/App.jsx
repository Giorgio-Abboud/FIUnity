import "./App.css";
import WritePost from "./components/WritePost";
import FinalPost from "./components/FinalPost";

function App() {
  return (
    <>
      <WritePost profilePic1={"/images/roary-profile-pic.jpg"} />
      <FinalPost
        name={"Roary Royce"}
        description={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
        }
        classification={"Student"}
        imgUrl={"/images/roary-post-img.png"}
        profilePic={"/images/roary-profile-pic.jpg"}
        profilePic1={"/images/other-profile-pic.png"}
      />
    </>
  );
}

export default App;
