import React from "react";
import EventDetails from "./Component/EventFinalDetail";
import { Query } from "react-apollo";
import { GET_EVENT } from "./queries";
class EventFinalDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id
    };
    this.BuildData = this.BuildData.bind(this);
  }
  BuildData = data => {
    let event = {
      title: data.name,
      description: data.description,
      image: data.image,
      date: data.event_date,
      location: data.location
    };
    let user = {
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@some.com",
      inviteeid: 0
    };
    let invitees = data.event_participants.map(ep => {
      return {
        name: ep.user,
        rsvp: ep.confirmed ? "going" : "not going"
      };
    });
    return {
      event,
      user,
      invitees
    };
  };
  render() {
    const { id } = this.state;
    return (
      <div className="App">
        <Query query={GET_EVENT} variables={{ event: parseInt(id) }}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading.....</div>;
            if (error) return <div>Error...</div>;
            if (data.event) {
              return (
                <div>
                  <EventDetails data={this.BuildData(data.event)} />
                </div>
              );
            }
          }}
        </Query>
      </div>
    );
  }
}
export default EventFinalDetail;
