import React from "react";
import "./App.css";
import Post from "./Components/Post";
import loadTweets from "./API/Get";
function App() {
  const [state, setstate] = React.useState<any>([]);
  const [action, setAction] = React.useState("");
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
      {state.map((item: any, index: number) => (
        <Post action={action} setAction={setAction} item={item} key={index} />
      ))}
    </div>
  );
}

export default App;
