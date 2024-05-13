import "./App.css";
import WritePost from "./components/WritePost";
import FinalPost from "./components/FinalPost";
import axios, {isCancel, AxiosError} from 'axios';

function App() {
  return (
    <>
      <WritePost name={"Roary Royce"}/>
      <FinalPost
        name={"Roary Royce"}
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
