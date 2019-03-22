import React from "react";
import { Grid, Paper } from "@material-ui/core";
import Event from "./Event";

const event = {
  image:
    "https://93546-d-c.ooyala.com/content/images/1208/1542184503_3805a158-e563-4eba-a31b-105cf488feaa_636x357.jpg",
  title: "Ski Event",
  description: "Ski Trip"
};
const EventList = () => {
  return (
    <div>
      <div>
        <Grid container spacing={24} style={{ padding: 24 }}>
          {[0, 1, 2, 3, 4, 5, 6].map(value => (
            <Grid key={value} item xs={2} sm={3} lg={2} xl={3}>
              <Event event={event} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default EventList;
