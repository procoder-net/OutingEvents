import React from "react";
import EventList from "./Component/EventList";

import SurveyCounts from "./Component/SurveyCounts";
import { Typography } from "@material-ui/core";
import { Query } from "react-apollo";

import { GET_ALL_EVENTS } from "./queries";
import { GET_COUNTED_SURVEYS } from "./queries";

class SurveyCountsDisplay extends React.Component {
  render() {
    return (
      <div className="App">
        <Query query={GET_COUNTED_SURVEYS} variables={{ eventId: 1 }}>
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
                    Survey Results
                  </Typography>
                  <SurveyCounts data={data} />
                </div>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
export default SurveyCountsDisplay;
