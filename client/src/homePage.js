import React from "react";
import EventList from "./Component/EventList";
import { Typography } from "@material-ui/core";
import { Query } from "react-apollo";
import { GET_ALL_EVENTS } from "./queries";
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    let user = JSON.parse(localStorage.getItem("user"));
    this.state = {
      user: user
    };
    this.filterData = this.filterData.bind(this);
  }

  filterData = events => {
    console.log(events);
    return events.map(event => {
      events.event_participants = events.event_participants.map(
        ep => ep.user === this.state.user.email
      );
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.user && (
          <Query
            query={GET_ALL_EVENTS}
            variables={{ user: this.state.user.email }}
          >
            {({ data, loading, error }) => {
              // console.log(this.filterData(data));
              if (loading) return <div>Loading.....</div>;
              if (error) return <div>Error...</div>;
              if (data) {
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
                      <EventList data={data.allEventsByUser} />
                    </div>
                  </div>
                );
              } else {
                return <h1>Nothing to render</h1>;
              }
            }}
          </Query>
        )}
      </div>
    );
  }
}
export default HomePage;
