async function checkAuthentication() {
  const isAuthenticated = await this.props.auth.isAuthenticated();
  if (isAuthenticated !== this.state.isAuthenticated) {
    let storage = localStorage.getItem("userInfo");
    if (isAuthenticated && !this.state.userinfo && !storage) {
      const userinfo = await this.props.auth.getUser();
      localStorage.setItem("userInfo", JSON.stringify(userinfo));
      this.setState({ isAuthenticated, userinfo });
    } else {
      this.setState({ isAuthenticated });
    }
  }
}

export { checkAuthentication };
