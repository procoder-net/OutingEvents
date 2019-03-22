import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from "@material-ui/core";

const Event = props => {
  return (
    <div>
      {props.event ? (
        <Card>
          <CardMedia
            style={{ height: 0, paddingTop: "56.25%" }}
            image={props.event.image}
            title={props.event.title}
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {props.event.title}
            </Typography>
            <Typography component="p">{props.event.description}</Typography>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};

export default Event;
