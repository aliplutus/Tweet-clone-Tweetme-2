import React from "react";
import "./App.css";
import TreeView from "./Components/treeView";
import { lookup } from "./API/Get";
import Tweet from "./Components/Tweet";
import { Item } from "./Types/Types";
import { ThemeProvider } from "@material-ui/core/styles";

function App() {
  const [state, setstate] = React.useState<any>([]);
  const ref: any = React.useRef();
  function handleSubmit(event: any) {
    event.preventDefault();
    let newTweet = ref.current.value;
    const callback = (response: Item, status: number) => {
      if (status === 201) {
        setstate((pre: any) => (pre = [response, ...pre]));
        ref.current.value = "";
      } else {
        console.log(response, status);
        if (status === 403) {
          window.location.href = "accounts/login";
        }
      }
    };
    lookup("POST", "/create/", callback, { content: newTweet });
  }
  const [username, setUsername] = React.useState("");
  const [tweetId, setTweetId] = React.useState("");

  React.useEffect(() => {
    const myCallback = (response: any, status: any) => {
      // console.log(response);
      if (status === 200) {
        setstate(response);
      } else {
        setstate(["There was an error"]);
      }
    };
    const element = document.getElementById("root")!;
    const filterUserName =
      typeof element.dataset.username == "undefined"
        ? ""
        : `?username=${element.dataset.username}`;
    const filterPostsId =
      typeof element.dataset.postid == "undefined"
        ? ""
        : element.dataset.postid;
    // console.log(window.location.pathname);

    // console.log(element.dataset);
    lookup("GET", `/posts/` + filterPostsId + filterUserName, myCallback);
  }, [username, tweetId]);

  return (
    // 🔴later users can change the theme.
    // <ThemeProvider theme={theme}>
    <div className="App">
      <input
        onKeyUp={(e: any) => {
          setUsername(e.target.value);
        }}
      />
      <input
        onKeyUp={(e: any) => {
          setTweetId(e.target.value);
        }}
      />
      <form onSubmit={handleSubmit}>
        <textarea ref={ref} required />
        <button type="submit">submit</button>
      </form>
      <TreeView />
      {/* // creating new post don't re-render the post component. */}
      {Tweet(state, setstate)}
    </div>
    // </ThemeProvider>
  );
}

export default App;
