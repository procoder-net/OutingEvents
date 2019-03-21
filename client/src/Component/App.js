import React from "react";

import { Query } from "react-apollo";
import { GET_ALL_EVENTS } from "../queries";

const App = () => (
  <div className="App">
    <h1>Home</h1>
    <Query query={GET_ALL_EVENTS}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading.....</div>;
        if (error) return <div>Error...</div>;
        console.log(data);
        return <p> Events </p>;
      }}
    </Query>
  </div>
);
export default App;
