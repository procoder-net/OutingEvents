import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

const rsvps = {
  invited: { text: "invited", className: "blue" },
  going: { text: "going", className: "green" },
  "not going": { text: "not going", className: "red" }
};

const styles = {
  blue: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  green: {
    backgroundColor: green[100],
    color: green[600]
  },
  red: {
    backgroundColor: red[100],
    color: red[600]
  }
};

class SimpleDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}
      >
        <DialogTitle id="simple-dialog-title">Are you ... ?</DialogTitle>
        <div>
          <List>
            {Object.keys(rsvps).map(rsvp => (
              <ListItem
                button
                onClick={() => this.handleListItemClick(rsvp)}
                key={rsvp}
              >
                <ListItemAvatar>
                  <Avatar className={classes[rsvps[rsvp].className]}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={rsvp} />
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string
};

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

class InvitationDecision extends React.Component {
  state = {
    open: false,
    selectedValue: rsvps[0]
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };

  render() {
    const { classes, rsvp } = this.props;
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
          className={classes[0]}
        >
          You are {this.state.selectedValue}
        </Button>
        <SimpleDialogWrapped
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default withStyles(styles)(InvitationDecision);
