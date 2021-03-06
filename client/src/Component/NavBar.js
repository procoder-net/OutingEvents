import React, { Component } from "react";
import { AppBar, Toolbar, Typography, Button, Link } from "@material-ui/core";
import { withAuth } from "@okta/okta-react";
import { compose } from "redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
`;

let classes;
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: null,
      inAddEventPage: false,
      currentRoute: "/",
      previousRoute: "",
      userInfo: null
    };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.gotoEvent = this.gotoEvent.bind(this);
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
      if (authenticated && !this.state.userinfo) {
        const userinfo = await this.props.auth.getUser();
        this.setState({ authenticated, userinfo });
      } else {
        this.setState({ authenticated });
      }
    }
  }
  async componentDidUpdate() {
    await this.checkAuthentication();
  }

  async login() {
    // Redirect to '/' after login
    this.props.auth.login("/");
  }

  async logout() {
    // Redirect to '/' after logout
    localStorage.removeItem("user");
    const email = [
      {
        name: "Mohammed Moyeen",
        email: "procoder.net@gmail.com"
      },
      {
        name: "Hari Krisha",
        email: "hari@gmail.com"
      },
      {
        name: "Moyeen Avaram",
        email: "mohammed.moyeen@gmail.com"
      }
    ];
    localStorage.setItem(
      "user",
      JSON.stringify(email[Math.floor(Math.random() * 3)])
    );
    this.props.auth.logout("/");
  }

  async gotoEvent() {
    this.setState({
      inAddEventPage: true,
      currentRoute: "/addevent"
    });
    this.props.history.push("/addevent");
  }

  render() {
    const { inAddEventPage } = this.state;
    const isLoggedIn = this.state.authenticated;
    return (
      <div>
        <AppBar position="static" position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              <Link to="/">Orgo Events</Link>
            </Typography>
            <div style={{ marginLeft: "auto" }}>
              {isLoggedIn && !inAddEventPage && (
                <StyledButton
                  onClick={this.gotoEvent}
                  color="inherit"
                  style={{ marginRight: "10px" }}
                >
                  Add Event
                </StyledButton>
              )}
              <StyledButton
                onClick={isLoggedIn ? this.logout : this.login}
                color="inherit"
                style={{ marginRight: "10px" }}
              >
                {isLoggedIn ? "Logout" : "Login"}
              </StyledButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default compose(
  withAuth,
  withRouter
)(NavBar);
