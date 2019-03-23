import React from "react";
import NavBar from "./Component/NavBar";
import EventList from "./Component/EventList";
import PaymentRec from "./Component/PaymentRec";
import { Query } from "react-apollo";
import { GET_ALL_EVENTS } from "./queries";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <h1>Home</h1>
        <Query query={GET_ALL_EVENTS}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading.....</div>;
            if (error) return <div>Error...</div>;
            console.log(data);
            return (
              <div>
                {/*<EventList />*/}
                <PaymentRec />
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
export default App;
