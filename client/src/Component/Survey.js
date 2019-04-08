import React from "react";
import * as Survey from "survey-react";
import breakpoints from "@material-ui/system/breakpoints";
import { Container } from "reactstrap";
import "./survey.css";

class SurveyDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.surveyJson = this.props.json;
    this.sendDataToServer = this.sendDataToServer.bind(this);
    Survey.defaultBootstrapMaterialCss.navigationButton = "btn btn-green";
    Survey.defaultBootstrapMaterialCss.rating.item =
      "btn btn-default my-rating";
    Survey.StylesManager.applyTheme("bootstrapmaterial");
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
        eventId: 1,
        surveyId: 1,
        useremail: "abc@abc.com",
        response: JSON.stringify(formattedResp.answer)
      }
    };
    this.props.submitSurvey(this.props.surveyMutation, formattedResp);
  }
  render() {
    return (
      <Container className="surveyForm">
        <Survey.Survey
          json={this.surveyJson}
          onComplete={this.sendDataToServer}
        />
      </Container>
    );
  }
}

export default SurveyDisplay;
