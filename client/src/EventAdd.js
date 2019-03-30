import React from "react";
import { Query } from "react-apollo";
import DemoForm from "./Component/EventAdd";
import { GET_ALL_EVENTS } from "./queries";

class EventAdd extends React.Component {
  handleDemoFormSubmit = (values, setSubmitting) => {
    console.log(values);
    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  };
  render() {
    let values = {
      name: "",
      email: "",
      age: 20
    };
    return (
      <div className="App">
        <DemoForm values={values} handleSubmit={this.handleDemoFormSubmit} />
      </div>
    );
  }
}
export default EventAdd;
