import React, { Component } from "react";
import { withAuth } from "@okta/okta-react";
import { checkAuthentication } from "./common/helper";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.checkAuthentication = checkAuthentication.bind(this);
  }

  async componentDidMount() {
    await this.checkAuthentication();
    const token = await this.props.auth.getAccessToken();
    const user = await this.props.auth.getUser();
    fetch("/api/auth", {
      method: "GET",
      headers: {
        authorization: token ? `Bearer ${token}` : "",
        "x-forwarded-user": user ? JSON.stringify(user) : ""
      }
    })
      .then(res => {
        return res;
      })
      .then(body => {
        console.log(body);
      });
  }

  render() {
    return <div />;
  }
}

export default withAuth(UserList);
