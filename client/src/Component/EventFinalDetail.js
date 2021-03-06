import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/lab/Container";
import Avatar from "@material-ui/core/Avatar";
import SimpleMap from "./SimpleMap";
import Markdown from "./Markdown";
import EventDetail from "./event-detail.md";
import InvitationDecision from "./InvitationDecision";
import { sizing } from "@material-ui/system";
import { Link as RouterLink } from "react-router-dom";

const styles = theme => ({
  "@global": {
    strong: {
      fontWeight: theme.typography.fontWeightMedium
    }
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto"
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0
  },
  backgroundImg: {},
  mainFeaturedEvent: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)"
  },
  mainFeaturedEventContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0
    }
  },
  mainGrid: {
    marginTop: theme.spacing(3)
  },
  card: {
    display: "flex"
  },
  cardDetails: {
    flex: 1
  },
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0)
  },
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200]
  },
  sidebarSection: {
    marginTop: theme.spacing(3)
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0)
  },
  avatar: {
    margin: 10
  }
});

const social = ["GitHub", "Twitter", "Facebook"];

function handleRSVPChange(value) {
  console.log("handleRSVPChange ==>", value);
}

class EventFinalDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
    this.state.classes = props.classes;
    let user = JSON.parse(localStorage.getItem("user"));
    this.state.user = user;
  }

  render() {
    const { classes, user, onRSVPChange, event, invitees } = this.state;
    const surveyResultUrl = "/surveyCounts/" + event.id;
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbar}>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              noWrap
              className={classes.toolbarTitle}
            >
              Event Final Detail
            </Typography>
            <RouterLink
              style={{ paddingRight: "15px" }}
              to={{ pathname: "/payments", state: this.state }}
            >
              Complete Event
            </RouterLink>
            <Button
              href={surveyResultUrl}
              style={{
                paddingRight: "15px",
                border: "2px",
                borderStyle: "dotted"
              }}
            >
              Survey Results
            </Button>
            <InvitationDecision rsvp={"going"} onChange={handleRSVPChange} />
          </Toolbar>
          <main>
            {/* Main featured event */}
            <Paper
              className={classes.mainFeaturedEvent}
              style={{
                backgroundImage: `url(${event.image})`,
                backgroundSize: "1244px 362px"
              }}
            >
              {/* Increase the priority of the hero background image */}
              {
                <img
                  style={{ display: "none" }}
                  src={event.image}
                  alt="background"
                />
              }
              <div className={classes.overlay} />
              <Grid container>
                <Grid item md={6}>
                  <div className={classes.mainFeaturedEventContent}>
                    <Typography
                      component="h1"
                      variant="h3"
                      color="inherit"
                      gutterBottom
                    >
                      {event.title}
                    </Typography>
                    <Typography variant="h5" color="inherit" paragraph>
                      {event.description}
                    </Typography>
                    <Link variant="subtitle1" href="#event-details">
                      Continue details…
                    </Link>
                  </div>
                </Grid>
              </Grid>
            </Paper>
            {/* End main featured event */}
            {/* Sub people coming */}
            <Grid container spacing={4} className={classes.cardGrid}>
              {invitees.map(invitee => (
                <Grid item key={invitee.name} xs={12} md={2}>
                  <CardActionArea>
                    <Card className={classes.card}>
                      <div className={classes.cardDetails}>
                        <CardContent align="center">
                          <Avatar className={classes.avatar}>
                            {/*invitee.name.match(/\b\w/g) || "??" */
                            invitee.name.charAt(0)}
                          </Avatar>
                          <Typography
                            component="h5"
                            variant="h5"
                            align="center"
                            style={{ fontSize: "15px", fontWeight: "bold" }}
                          >
                            {invitee.name.substring(
                              0,
                              invitee.name.lastIndexOf("@")
                            )}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            align="center"
                          >
                            {invitee.rsvp}
                          </Typography>
                        </CardContent>
                      </div>
                    </Card>
                  </CardActionArea>
                </Grid>
              ))}
            </Grid>
            {/* End sub people coming */}
            <Grid container spacing={5} className={classes.mainGrid}>
              {/* Main content */}
              <Grid item xs={12} md={8}>
                <div id="event-details">
                  <Typography variant="h6" gutterBottom>
                    Event Description
                  </Typography>
                </div>
                <Divider />
                <Markdown
                  className={classes.markdown}
                  key={EventDetail.substring(0, 40)}
                >
                  {EventDetail}
                </Markdown>
              </Grid>
              {/* End main content */}
              {/* Sidebar */}
              <Grid item xs={12} md={4}>
                <Paper elevation={0} className={classes.sidebarAboutBox}>
                  <Typography variant="h6" gutterBottom>
                    Event organizer
                  </Typography>
                  <CardActionArea component="a" href="#">
                    <Card className={classes.card}>
                      <div className={classes.cardDetails}>
                        <CardContent align="center">
                          <Avatar className={classes.avatar}>
                            {this.state.user.name.match(/\b\w/g) || "??"}
                          </Avatar>
                          <Typography
                            component="h2"
                            variant="h5"
                            align="center"
                          >
                            {
                              /*invitees[event.organizerid].name*/
                              this.state.user.name
                            }
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            align="center"
                          >
                            {invitees[0].rsvp}
                          </Typography>
                        </CardContent>
                      </div>
                    </Card>
                  </CardActionArea>
                </Paper>

                <Typography
                  variant="h6"
                  gutterBottom
                  className={classes.sidebarSection}
                >
                  How to find us
                </Typography>
                <div style={{ height: "400px", width: "100%" }}>
                  <SimpleMap />
                </div>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={classes.sidebarSection}
                >
                  Share
                </Typography>
                {social.map(network => (
                  <Link display="block" variant="body1" href="#" key={network}>
                    {network}
                  </Link>
                ))}
              </Grid>
              {/* End sidebar */}
            </Grid>
          </main>
        </Container>
        {/* Footer */}
        <footer className={classes.footer}>
          <Container maxWidth="lg">
            <Typography variant="h6" align="center" gutterBottom>
              Have a good time!
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
              component="p"
            >
              Feedback [+]
            </Typography>
          </Container>
        </footer>
        {/* End footer */}
      </React.Fragment>
    );
  }
}

EventFinalDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  onRSVPChange: PropTypes.func
};

export default withStyles(styles)(EventFinalDetail);
