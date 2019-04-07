import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  CardActionArea,
  Avatar,
  IconButton
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import { blue } from "@material-ui/core/colors";
const descriptionLen = 100;
const titleLen = 20;
import "./event.css";

const styles = theme => ({
  card: {
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column"
  },
  media: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    height: "8%",
    flexGrow: 1
  },
  status: {
    position: "absolute",
    bottom: "100px",
    right: "16px",
    color: "greenyellow",
    zIndex: "10"
  }
});

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.onClick = this.onClick.bind(this);
  }
  onClick = e => {
    alert("clicked");
  };

  render() {
    const { classes } = this.state;

    const { id, image, name, description, event_date } = this.state.event;

    return (
      <div>
        {this.state.event ? (
          <Link
            to={`/eventDetail/${id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar aria-label="Recipe" className={classes.avatar}>
                    R
                  </Avatar>
                }
                action={
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                }
                title={
                  name.length > titleLen
                    ? name.substring(0, titleLen - 3) + "..."
                    : name
                }
                subheader={event_date}
              />
              <CardMedia className={classes.media} image={image} title={name}>
                <h3 className={classes.status}>Accepted</h3>
              </CardMedia>
              <CardContent className={classes.cardContent}>
                <Typography component="p">
                  {description.length > descriptionLen
                    ? description.substring(0, descriptionLen - 3) + "..."
                    : description}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles)(Event);
