import React from "react";
import NavBar from "./Component/NavBar";
import SurveyDisplay from "./Component/Survey";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { ADD_SURVEY_RESULT, GET_SURVEY_QUESTION } from "./queries";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";
const styles = theme => ({
  layout: {
    width: "60%",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(1000 + theme.spacing(3 * 2))]: {
      width: "60%",
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

class SurveyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props.classes
    };
    this.surveyJson = require("./Component/survey.json");
    this.submitSurvey = this.submitSurvey.bind(this);
  }
  submitSurvey = async (mutate, data) => {
    let i = {
      survey: {
        surveyquestion: JSON.stringify(data.questions),
        event_id: 1,
        survey_id: 1,
        participant_id: 2,
        user: "abc@abc.com",
        response: JSON.stringify(data.answer)
      }
    };
    await mutate({ variables: i });
  };
  render() {
    let { classes } = this.state;
    return (
      <div className={classes.layout}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
          style={{ padding: "20 20", margin: "0 auto" }}
        >
          Survey
        </Typography>
        <Paper className={classes.paper}>
          <Query query={GET_SURVEY_QUESTION} variables={{ id: 1 }}>
            {({ data, loading, error }) => {
              if (loading) return <div>Loading.....</div>;
              if (error) return <div>Error...</div>;
              let surveyq = data;
              return (
                <Mutation mutation={ADD_SURVEY_RESULT}>
                  {(addSurvey, { data }) => (
                    <SurveyDisplay
                      json={JSON.parse(surveyq.survey.questions)}
                      submitSurvey={this.submitSurvey}
                      surveyMutation={addSurvey}
                    />
                  )}
                </Mutation>
              );
            }}
          </Query>
        </Paper>
      </div>
    );
  }
}
export default withStyles(styles)(SurveyPage);
