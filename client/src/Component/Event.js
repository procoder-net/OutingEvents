import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea
} from "@material-ui/core";

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
    return (
      <div>
        {this.state.event ? (
          <Card color="inherit">
            <CardActionArea onClick={this.onClick}>
              <CardMedia
                style={{ height: 0, paddingTop: "56.25%" }}
                image={this.state.event.image}
                title={this.state.event.title}
              />
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  {this.state.event.title}
                </Typography>
                <Typography component="p">
                  {this.state.event.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ) : null}
      </div>
    );
  }
}

export default Event;
