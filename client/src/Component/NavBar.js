import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Button,
  withStyles
} from "@material-ui/core";

const NavBar = () => {
  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Orgo Events
          </Typography>
          <Button color="primary" variant="outlined">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
