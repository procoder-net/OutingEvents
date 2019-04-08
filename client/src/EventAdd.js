import React from "react";
import DemoForm from "./Component/EventAdd";
import { Redirect } from "react-router";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { ADD_EVENT } from "./queries";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";
import LoadingOverlay from "react-loading-overlay";
const styles = theme => ({
  layout: {
    width: "90%",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(1000 + theme.spacing(3 * 2))]: {
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(1000 + theme.spacing(3 * 2))]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      padding: theme.spacing(3)
    }
  }
});

class EventAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props.classes,
      goToHome: false,
      submitting: false
    };
    this.notify = this.notify.bind(this);
    this.handleDemoFormSubmit = this.handleDemoFormSubmit.bind(this);
  }

  notify = () => {
    toast.info("Event Created", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2000,
      onClose: () => {
        this.setState({
          goToHome: true
        });
      }
    });
  };

  handleDemoFormSubmit = async (addFunc, input) => {
    this.setState({
      submitting: true
    });
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
        survey: 1,
        location: "san jose",
        invited: input.invited.map(invite => invite.value),
        image: input.image,
        organizer: ["Moyeen"]
      }
    };
    await addFunc({ variables: i });
    this.setState({
      submitting: false
    });
    await this.notify();
  };
  render() {
    let { classes, goToHome, submitting } = this.state;
    if (goToHome) {
      return <Redirect to="/" />;
    }
    return (
      <div className={classes.layout}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
          style={{ padding: "10 10" }}
        >
          Add an Event
        </Typography>
        <LoadingOverlay
          active={submitting}
          spinner
          text="Event is being Submitted...."
        >
          <Paper className={classes.paper}>
            <Mutation mutation={ADD_EVENT}>
              {(addEvent, { data }) => (
                <div className="App">
                  <DemoForm
                    handleSubmit={this.handleDemoFormSubmit}
                    addEvent={addEvent}
                  />
                  <ToastContainer />
                </div>
              )}
            </Mutation>
          </Paper>
        </LoadingOverlay>
      </div>
    );
  }
}
export default withStyles(styles)(EventAdd);
