import React from "react";
import NavBar from "./Component/NavBar";
import SurveyDisplay from "./Component/Survey";
class SurveyPage extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <SurveyDisplay />
      </div>
    );
  }
}
export default SurveyPage;
