import React from "react";
import DemoForm from "./Component/EventAdd";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { ADD_EVENT } from "./queries";
class EventAdd extends React.Component {
  handleDemoFormSubmit = async (addFunc, input) => {
    var d = new Date();
    var deadlineDate = input.deadlinedate.split("-");
    var deadlineTime = input.deadlinetime.split(":");
    const i = {
      event: {
        name: input.name,
        type: input.type.value,
        description: input.description,
        eventDateTime: {
          month: d.getMonth(),
          day: d.getDay(),
          year: d.getFullYear(),
          hour: d.getHours(),
          minute: d.getMinutes()
        },
        deadlineDatetime: {
          month: parseInt(deadlineDate[1]),
          day: parseInt(deadlineDate[2]),
          year: parseInt(deadlineDate[0]),
          hour: parseInt(deadlineTime[0]),
          minute: parseInt(deadlineTime[1])
        },
        survey: 5,
        location: "san jose",
        invited: input.invited.map(invite => invite.value),
        organizer: ["Moyeen"]
      }
    };
    console.log(i);
    await addFunc({ variables: i });
  };
  render() {
    let values = {
      name: "",
      email: "",
      age: 20
    };
    return (
      <Mutation mutation={ADD_EVENT}>
        {(addEvent, { data }) => (
          <div className="App">
            <DemoForm
              values={values}
              handleSubmit={this.handleDemoFormSubmit}
              addEvent={addEvent}
            />
          </div>
        )}
      </Mutation>
    );
  }
}
export default EventAdd;
