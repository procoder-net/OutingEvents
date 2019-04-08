import React from "react";
import NavBar from "./Component/NavBar";
import SurveyDisplay from "./Component/Survey";
import HomePage from "./homePage";
import CssBaseline from "@material-ui/core/CssBaseline";
import Home from "./Home";
import Login from "./Component/auth/Login";
import PaymentRec from "./Component/PaymentRec";
import EventAdd from "./EventAdd";
import AddPayment from "./Component/AddPayment";

import EventFinalDetail from "./EventFinalDetail";
import { Security, SecureRoute, ImplicitCallback } from "@okta/okta-react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import SurveyCountsPage from "./SurveyCountsPage";
import SurveyPage from "./SurveyPage";
import UserList from "./testProfile";
function onAuthRequired({ history }) {
  history.push("/login");
}
const config = {
  issuer: "https://dev-904688.okta.com/oauth2/default",
  redirect_uri: window.location.origin + "/implicit/callback",
  client_id: "0oady6mi7hzP6gHUF356"
};

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <Security
          issuer={config.issuer}
          client_id={config.client_id}
          redirect_uri={config.redirect_uri}
          onAuthRequired={onAuthRequired}
        >
          <CssBaseline />
          <div className="App">
            <NavBar />
          </div>
          <div className="content">
            <SecureRoute path="/" exact component={HomePage} />
            <Route
              path="/login"
              render={() => <Login baseUrl="https://dev-904688.okta.com" />}
            />
            <Route path="/implicit/callback" component={ImplicitCallback} />
            <SecureRoute exact path="/events" component={HomePage} />
            <SecureRoute path="/user" component={UserList} />
            <SecureRoute path="/survey/:id" component={SurveyPage} />
            <SecureRoute path="/addevent" component={EventAdd} />
            <SecureRoute path="/paymentRec" component={PaymentRec} />
            <SecureRoute path="/payments" component={AddPayment} />
            <SecureRoute path="/eventDetail/:id" component={EventFinalDetail} />
            <SecureRoute
              path="/surveyCounts/:id"
              component={SurveyCountsPage}
            />
          </div>
        </Security>
      </BrowserRouter>
    );
  }
}
export default App;
