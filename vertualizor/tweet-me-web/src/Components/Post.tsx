import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { lookup } from "../API/Get";
type Props = {
  item: {
    content: string | null;
    like: number[];
    is_retweet: boolean;
    parent: any;
    user: number;
  };
  setAction: any;
  action: string;
};
function Post(props: Props) {
  const item: any = props.item;
  const [isover, setMouse] = React.useState(false);
  const [likes, setLike] = React.useState(item.like);

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        maxWidth: "50%",
        margin: "10px",
      },
      media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
      },
      expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: "rotate(180deg)",
      },
      avatar: {
        backgroundColor: item.user === 2 ? red[500] : "green",
      },
    })
  );
  const classes = useStyles();

  React.useEffect(() => {
    props.setAction("");
  }, [props.action]);
  function handlClikeLikeBtn(event: any) {
    function callBack(response: any, status: number) {
      // console.log(response, status, item);
      if (status == 200) {
        !likes.includes(parseInt(response.user)) &&
          setLike([...likes, parseInt(response.user)]);
      }
    }
    lookup("POST", "/posts/actions/", callBack, {
      action: "like",
      id: item.id,
      user: item.user,
    });
  }
  return (
    <Card
      onMouseEnter={() => setMouse(true)}
      onMouseLeave={() => setMouse(false)}
      className={classes.root}
    >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}></Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {isover && <MoreVertIcon />}
          </IconButton>
        }
        title={item.user}
        subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image="https://www.princeton.edu/sites/default/files/styles/half_2x/public/images/2018/01/clouds-19.jpg?itok=Qfa5j6NW"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {item.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handlClikeLikeBtn} aria-label="add to favorites">
          {likes.length} <ThumbUpAltOutlinedIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
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
    </Card>
  );
}

export default Post;
