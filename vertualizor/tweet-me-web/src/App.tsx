import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [state, setstate] = React.useState<any>([]);
  React.useEffect(() => {
    const twetsItems: object = [{ content: "value1" }, { content: "value2" }];
    setstate(twetsItems);
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
