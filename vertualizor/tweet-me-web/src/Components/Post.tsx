import React from "react";
import clsx from "clsx";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { lookup } from "../API/Get";
import { Props } from "../Types/Types";
import useStyles from "../UseStyles/UseStyles";
function Post(props: Props) {
  const classes = useStyles();
  const item: any = props.item;
  // const [isover, setMouse] = React.useState(false);

  const [likes, setLike] = React.useState(item.like);

  React.useEffect(() => {
    //this to rerender like button
    //without it the new post will take the same info  of the last post.
    setLike(item.like);
  }, [item]);

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function handlClikeLikeBtn(event: any) {
    function callBack(response: any, status: number) {
      // console.log(response, status, item);
      if (status == 200) {
        setLike(response[0].like);
        console.log({ object: response[0].like });
      }
    }
    lookup("POST", "/posts/actions/", callBack, {
      action: "like",
      id: item.id,
    });
  }
  function handleRetweet(event: any) {
    function callBack(response: any, status: any) {
      // console.log(response);
      response.content =
        "parent post later you shoul be able to edit it befre retweeting and after retweeting";
      if (status == 201) {
        props.setstate((pre: any) => {
          return [response, ...pre];
        });
      }
    }
    lookup("POST", "/posts/actions/", callBack, {
      action: "retweet",
      id: item.id,
      // user: item.user,
    });
  }
  return (
    <div
    // onMouseEnter={() => setMouse(true)}
    // onMouseLeave={() => setMouse(false)}
    >
      <CardHeader
        onClick={(event: any) => {
          window.location.href = item.id;
        }}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}></Avatar>
        }
        // action={
        //   <Button aria-label="settings">
        //     {isover && <MoreVertIcon />}
        //   </Button>
        // }
        title={item.user}
        subheader="September 14, 2016"
      />
      {/* <CardMedia
        className={classes.media}
        image="https://www.princeton.edu/sites/default/files/styles/half_2x/public/images/2018/01/clouds-19.jpg?itok=Qfa5j6NW"
        title="Paella dish"
      /> */}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {item.content}
        </Typography>
      </CardContent>
      <CardActions className={classes.root} disableSpacing>
        {typeof item.is_retweet !== "undefined" && (
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button aria-label="settings">{<MoreVertIcon />}</Button>
            <Button onClick={handlClikeLikeBtn} aria-label="add to favorites">
              {likes} <ThumbUpAltOutlinedIcon />
            </Button>
            <Button onClick={handleRetweet} aria-label="share">
              <ShareIcon />
            </Button>
            <Button
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </Button>
          </ButtonGroup>
        )}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>text herer.</Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse>
    </div>
  );
}

export default Post;
