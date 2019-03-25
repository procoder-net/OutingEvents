import React from "react";
import * as Survey from "survey-react";

class SurveyDisplay extends React.Component {
  constructor() {
    super();
    this.surveyJson = require("./survey.json");
  }

  sendDataToServer(survey) {
    var resultAsString = JSON.stringify(survey.data);
    alert(resultAsString); //send Ajax request to your web server.
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
