import React from "react";
import EventList from "./Component/EventList";
import { Typography } from "@material-ui/core";
import { Query } from "react-apollo";
import { GET_ALL_EVENTS } from "./queries";
class HomePage extends React.Component {
  render() {
    return (
      <div className="App">
        <Query query={GET_ALL_EVENTS}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading.....</div>;
            if (error) return <div>Error...</div>;
            return (
              <div>
                <div className="Upcoming">
                  <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="textPrimary"
                    gutterBottom
                    style={{ padding: "20 20", margin: "0 auto" }}
                  >
                    Upcoming Events
                  </Typography>
                  <EventList data={data} />
                </div>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
export default HomePage;
