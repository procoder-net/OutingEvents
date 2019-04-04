import React from "react";
import NavBar from "./Component/NavBar";
import SurveyDisplay from "./Component/Survey";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { ADD_SURVEY_RESULT, GET_SURVEY_QUESTION } from "./queries";
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
        event_id: 1,
        survey_id: 1,
        participant_id: 1,
        user: "abc@abc.com",
        response: JSON.stringify(data.answer)
      }
    };
    await mutate({ variables: i });
  };
  render() {
    console.log(GET_SURVEY_QUESTION);
    return (
      <div>
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
      </div>
    );
  }
}
export default SurveyPage;
