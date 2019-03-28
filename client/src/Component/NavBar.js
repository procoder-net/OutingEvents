import React, { Component } from "react";
import { AppBar, Toolbar, Typography, Link, Button } from "@material-ui/core";
import { withAuth } from "@okta/okta-react";
import { compose } from "redux";
import styled from "styled-components";

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
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }
  componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    // Redirect to '/' after login
    this.props.auth.login("/");
  }

  async logout() {
    // Redirect to '/' after logout
    this.props.auth.logout("/");
  }

  render() {
    const isLoggedIn = this.state.authenticated;
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="subtitle1" color="inherit" style={{ flex: 1 }}>
              Orgo Events
            </Typography>
            {isLoggedIn ? (
              <StyledButton onClick={this.logout} color="inherit">
                Logout
              </StyledButton>
            ) : (
              <StyledButton onClick={this.login} color="inherit">
                Login
              </StyledButton>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default compose(withAuth)(NavBar);
