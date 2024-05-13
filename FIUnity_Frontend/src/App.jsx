import "./App.css";
import WritePost from "./components/WritePost";
import FinalPost from "./components/FinalPost";

function App() {
  // const [writePost, setWritePost] = useState("")
  // const getWritePost = () => {
  //   axios
  //     .get("http://10.108.229.73:8000/writePost/")
  //     .then(res => {console.log(res.data.content) setWritePost(res.data.content)})
  //     .catch(err => {consol.log(err)});
  // };
  return (
    <>
      <WritePost firstName={"Roary"} lastName={"Royce"} />
      <FinalPost
        firstName={"Roary"}
        lastName={"Royce"}
        description={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
        }
        classification={"Student"}
        imgUrl={"/images/roary-post-img.png"}
      />
    </>
  );
}

export default App;
