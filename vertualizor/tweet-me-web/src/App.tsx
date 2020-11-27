import React from "react";
import "./App.css";
function loadTweets(callback: any) {
  const xhr = new XMLHttpRequest();
  const method = "GET"; // "POST"
  // const url = "http://127.0.0.1:8000/posts/";
  const url = "http://localhost:8000/posts/";
  const responseType = "json";
  xhr.responseType = responseType;
  xhr.open(method, url);
  xhr.onload = function () {
    callback(xhr.response, xhr.status);
  };
  xhr.onerror = function (e) {
    console.log(e);
    callback({ message: "The request was an error" }, 400);
  };
  xhr.send();
}
function App() {
  const [state, setstate] = React.useState<any>([]);
  console.log(state);
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
      {state.map((item: { content: string | number }) => (
        <h1>{item.content}</h1>
      ))}
    </div>
  );
}

export default App;
