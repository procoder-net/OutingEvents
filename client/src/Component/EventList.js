import React from "react";
import { Grid, Paper } from "@material-ui/core";
import Event from "./Event";
import { withStyles } from "@material-ui/core/styles";
import { width } from "@material-ui/system/sizing";
import classNames from "classnames";
const styles = theme => ({
  layout: {
    width: "80%",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(1000 + theme.spacing(3 * 2))]: {
      width: "80%",
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: theme.spacing(3)
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(1000 + theme.spacing(3 * 2))]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      padding: theme.spacing(3)
    }
  }
});
const EventList = data => {
  let events = data.data;
  console.log(events);
  events = events.sort(function(a, b) {
    return new Date(a.event_date) - new Date(b.event_date);
  });
  let { classes } = data;
  return (
    <div className={classNames(classes.layout, classes.cardGrid)}>
      <Grid container spacing={8}>
        {events.map(event => (
          <Grid item key={event.id} xs={8} md={6} lg={3} xl={2}>
            <Event event={event} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(EventList);
