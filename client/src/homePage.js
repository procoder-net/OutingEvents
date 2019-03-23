import React from "react";
import EventList from "./Component/EventList";
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
            console.log(data);
            return (
              <div>
                <p>Events</p>
                <EventList />
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
export default HomePage;
