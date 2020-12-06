import React from "react";
import Post from "./Post";
import Card from "@material-ui/core/Card";
import { Item } from "../Types/Types";
function Tweet(state: any, setstate: Function) {
  return state.map((item: Item, index: number) => {
    const parentItem = {
      ...item.parent,
      user: item.user,
    };
    return (
      <Card key={index} style={{ width: "50%", margin: "10px" }}>
        {item.parent && (
          <Card style={{ margin: "50px", border: "red" }}>
            <Post setstate={setstate} item={parentItem} />
          </Card>
        )}
        <Post setstate={setstate} item={item} key={index} />
      </Card>
    );
  });
}
export default Tweet;
