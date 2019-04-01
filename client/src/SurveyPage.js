import React from "react";
import NavBar from "./Component/NavBar";
import SurveyDisplay from "./Component/Survey";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_SURVEY_RESULT = gql`
  mutation sendSurvey($survey: SurveyResultInput) {
    createSurveyResponse(survey: $survey) {
      event
    }
  }
`;

class SurveyPage extends React.Component {
  constructor(props) {
    super(props);
    this.surveyJson = require("./Component/survey.json");
    this.submitSurvey = this.submitSurvey.bind(this);
  }
  submitSurvey = async (mutate, data) => {
    var i = {
      survey: {
        surveyquestion: JSON.stringify(data.questions),
        eventId: 2,
        surveyId: 2,
        useremail: "abc@abc.com",
        response: JSON.stringify(data.answer)
      }
    };
    await mutate({ variables: i });
  };
  render() {
    return (
      <div>
        <Mutation mutation={ADD_SURVEY_RESULT}>
          {(addSurvey, { data }) => (
            <SurveyDisplay
              json={this.surveyJson}
              submitSurvey={this.submitSurvey}
              surveyMutation={addSurvey}
            />
          )}
        </Mutation>
      </div>
    );
  }
}
export default SurveyPage;
