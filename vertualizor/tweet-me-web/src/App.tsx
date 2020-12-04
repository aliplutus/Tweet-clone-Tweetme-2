import React from "react";
import "./App.css";
import Post from "./Components/Post";
import TreeView from "./Components/treeView";
import { lookup } from "./API/Get";
import Card from "@material-ui/core/Card";
function App() {
  const [state, setstate] = React.useState<any>([]);
  const ref: any = React.useRef();
  function handleSubmit(event: any) {
    event.preventDefault();
    let newTweet = ref.current.value;
    const callback = (response: any, status: number) => {
      if (status === 201) {
        console.log(response, status);
        setstate((pre: any) => (pre = [response, ...pre]));
        ref.current.value = "";
      } else {
        console.log(response, status);
      }
    };
    lookup("POST", "/create/", callback, { content: newTweet });
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
    lookup("GET", "/posts/", myCallback);
  }, []);
  console.log(state);
  function Tweet(state: any) {
    return state.map((item: any, index: number) => (
      <Card style={{ width: "50%", margin: "10px" }}>
        {item.parent && (
          <Card style={{ margin: "50px", border: "red" }}>
            <Post item={item.parent} key={index} />
          </Card>
        )}
        <Post item={item} key={index} />
      </Card>
    ));
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <textarea ref={ref} required />
        <button type="submit">submit</button>
      </form>
      <TreeView />
      {/* // creating new post don't re-render the post component. */}
      {Tweet(state)}
    </div>
  );
}

export default App;
