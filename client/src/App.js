import React from "react";
import NavBar from "./Component/NavBar";
import SurveyDisplay from "./Component/Survey";
import HomePage from "./homePage";
import PaymentRec from "./Component/PaymentRec";
import { BrowserRouter, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <h1>Home</h1>
        </div>
        <div className="content">
          <Route exact path="/" component={HomePage} />
          <Route path="/survey" component={SurveyDisplay} />
          <Route path="/paymentRec" component={PaymentRec} />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
