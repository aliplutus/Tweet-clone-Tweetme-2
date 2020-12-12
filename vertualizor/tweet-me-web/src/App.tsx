import React from "react";
import "./App.css";
import TreeView from "./Components/treeView";
import { lookup } from "./API/Get";
import Tweet from "./Components/Tweet";
import { Item } from "./Types/Types";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./UseStyles/UseStyles";

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
    const filterUserName = username.length > 0 ? "?username=" + username : "";
    const filterPostsId = tweetId.length > 0 ? `${tweetId}` : "";
    console.log(window.location.pathname);
    lookup(
      "GET",
      `/posts/${window.location.pathname.slice(1)}` +
        filterPostsId +
        filterUserName,
      myCallback
    );
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
