import React from "react";
type Props = {
  item: {
    content: string | null;
    like: number[];
    is_retweet: boolean;
    parent: any;
  };
  setAction: any;
  action: string;
};
function Post(props: Props) {
  const item = props.item;
  React.useEffect(() => {
    props.setAction("");
  }, [props.action]);

  return (
    <div style={{ margin: "10px" }} className="card w-50">
      <div className="card-body">
        <p contentEditable suppressContentEditableWarning className="card-text">
          {item.content}
        </p>
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            onClick={() => props.setAction("like")}
            type="button"
            className="btn btn-success"
          >
            {item.like.length}👍
          </button>
          <button type="button" className="btn btn-danger">
            👎
          </button>
          <button type="button" className="btn btn-primary">
            ReTweet
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
