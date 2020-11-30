import React from "react";
import "./App.css";
import Post from "./Components/Post";
import loadTweets from "./API/Get";
import TreeView from "./Components/treeView";
import { lookup } from "./API/Get";
function App() {
  const [state, setstate] = React.useState<any>([]);
  const [action, setAction] = React.useState("");
  const ref: any = React.useRef();
  function handleSubmit(event: any) {
    event.preventDefault();
    let newTweet = ref.current.value;
    const callback = (response: any, status: number) => {
      if (status === 201) {
        setstate((pre: any) => (pre = [response, ...pre]));
      } else {
        alert(response + status);
      }
    };
    lookup("POST", "/posts/", callback, { content: newTweet });

    ref.current.value = "";
  }
  React.useEffect(() => {
    const myCallback = (response: any, status: any) => {
      console.log(response, status);
      if (status === 200) {
        setstate(response);
      } else {
        setstate(["There was an error"]);
      }
    };
    loadTweets(myCallback);
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <textarea ref={ref} required />
        <button type="submit">submit</button>
      </form>
      <TreeView />
      {/* // creating new post don't re-render the post component. */}
      {state.map((item: any, index: number) => (
        <Post action={action} setAction={setAction} item={item} key={index} />
      ))}
    </div>
  );
}

export default App;
