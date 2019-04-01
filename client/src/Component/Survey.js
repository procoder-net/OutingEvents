import React from "react";
import * as Survey from "survey-react";
import breakpoints from "@material-ui/system/breakpoints";

class SurveyDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.surveyJson = this.props.json;
    this.sendDataToServer = this.sendDataToServer.bind(this);
  }
  formatSurveyResponse(json, response) {
    let questions = [];
    let formattedResponse = {};
    json.pages.forEach(page => {
      let question = {};
      page.elements.forEach(element => {
        let answer = {};
        question["id"] = element.name;
        question["question"] = element.title;
        element.choices.forEach(choice => {
          answer[choice.value] = choice.text;
        });
        question["answer"] = answer;
        questions.push(question);
        question = {};
      });
    });
    /*Object.keys(response).forEach(key => {
            let choices = questions.filter(q => q.id == key)[0];
            response[key] = response[key].map(val => choices.answer[val]);
        });*/
    return {
      questions,
      answer: response
    };
  }
  async sendDataToServer(survey) {
    let formattedResp = this.formatSurveyResponse(this.surveyJson, survey.data);
    var i = {
      survey: {
        surveyquestion: JSON.stringify(formattedResp.questions),
        eventId: 2,
        surveyId: 2,
        useremail: "abc@abc.com",
        response: JSON.stringify(formattedResp.answer)
      }
    };
    /* let done = await this.props.surveyMutation({ variables: i }); */
    this.props.submitSurvey(this.props.surveyMutation, formattedResp);
  }
  render() {
    return (
      <Survey.Survey
        json={this.surveyJson}
        onComplete={this.sendDataToServer}
      />
    );
  }
}

export default SurveyDisplay;
