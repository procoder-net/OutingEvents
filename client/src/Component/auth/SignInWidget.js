// src/OktaSignInWidget.js

import React, { Component } from "react";
import ReactDOM from "react-dom";
import OktaSignIn from "@okta/okta-signin-widget";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import "@okta/okta-signin-widget/dist/css/okta-theme.css";
import logo from "../../../public/images/orgo2.png";

export default class OktaSignInWidget extends Component {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    this.widget = new OktaSignIn({
      baseUrl: this.props.baseUrl,
      logo: logo,
      features: {
        registration: true, // Enable self-service registration flow
        rememberMe: true
      }
    });
    this.widget.renderEl({ el }, this.props.onSuccess, this.props.onError);
  }

  componentWillUnmount() {
    this.widget.remove();
  }

  render() {
    return <div />;
  }
}
