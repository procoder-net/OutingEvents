const css = require("../App.css");

import React from "react";
import Select from "react-select";
import {
  Input,
  Button,
  Row,
  Col,
  Container,
  Label,
  Table,
  FormGroup,
  Form
} from "reactstrap";
import { ADD_PAYMENT } from "./../queries";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";
import { Mutation } from "react-apollo";

const styles = theme => ({
  layout: {
    width: "90%",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(1000 + theme.spacing(3 * 2))]: {
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(1000 + theme.spacing(3 * 2))]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      padding: theme.spacing(3)
    }
  }
});

var options = [
  /*{ value: "abc@gmail.com", label: "Moyeen" },
    { value: "abc2@gmail.com", label: "Shravan" },
    { value: "abc3@gmail.com", label: "Debbie" },
    { value: "abc4@gmail.com", label: "Hari" },
    { value: "abc5@gmail.com", label: "Arturo" },
    { value: "abc6@gmail.com", label: "Kyrylo" }*/
];

const boxStyle = {};

const currencies = [
  { value: "usd", label: "US Dollars" },
  { value: "eur", label: "Euros" },
  { value: "jpy", label: "Japanese Yen" }
];

const submitForm = () => {
  /*return (
        <Mutation mutation={ADD_PAYMENT}>
            {(addSurvey, { data }) => (
                <SurveyDisplay
                    json={JSON.parse(surveyq.survey.questions)}
                    submitSurvey={this.submitSurvey}
                    surveyMutation={addSurvey}
                />
            )}
        </Mutation>
    );*/
};

const TableContent = props => {
  return props.payments.map((payment, index) => {
    return (
      <tbody>
        <tr>
          <th scope="row">{index}</th>
          <td>{payment.user}</td>
          <td>
            {payment.amount} {payment.currency}
          </td>
          <td>{payment.status}</td>
        </tr>
      </tbody>
    );
  });
};

class AddPayment extends React.Component {
  constructor(props) {
    options = props.location.state.invitees;
    super(props);
    this.state = {
      payments: [
        {
          participant_id: 1,
          user: "user",
          amount: 22,
          currency: "usd",
          status: "paid",
          event_id: 1
        }
      ],
      eventId: props.location.state.event.id,
      classes: props.classes
    };
    this.handleChange = this.handleChange.bind(this);
    this.setCurrencyChange = this.setCurrencyChange.bind(this);
    this.handleAddPayment = this.handleAddPayment.bind(this);
    this.setCurrencyChange = this.setCurrencyChange.bind(this);
    this.handlePaidStatus = this.handlePaidStatus.bind(this);
  }

  handleAddPayment = event => {
    const paymentList = this.state.payments;
    const paymentInfo = {
      participant_id: this.state.selectedInvitee.id,
      user: this.state.selectedInvitee.label,
      amount: this.state.selectedAmount,
      currency: this.state.selectedCurrency.label,
      status: this.state.status,
      event_id: this.state.eventId
    };
    paymentList.push(paymentInfo);
    this.setState({ payments: paymentList });
    event.preventDefault();
  };

  handlePaidStatus = event => {
    this.setState({ status: event.target.value });
  };

  handleChange = selectedInvitee => {
    this.setState({ selectedInvitee });
  };
  setCurrencyChange = selectedCurrency => {
    this.setState({ selectedCurrency });
  };

  setAmountChange = event => {
    const selectedAmount = parseFloat(event.target.value);
    this.setState({ selectedAmount });
  };

  render() {
    const { selectedInvitee, classes } = this.state;
    const { selectedCurrency } = this.state;
    return (
      <div className={classes.layout}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
          style={{ padding: "10 10" }}
        >
          Complete an Event
        </Typography>
        <Paper className={classes.paper}>
          <Row>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Participant Name</th>
                  <th>Amount</th>
                  <th>Paid (Y/N)</th>
                </tr>
              </thead>
              <TableContent payments={this.state.payments} />
            </Table>
          </Row>
          <Form className="form">
            <Row>
              <Col>
                <FormGroup>
                  <Label>Participant</Label>
                  <Select
                    value={selectedInvitee}
                    onChange={this.handleChange}
                    options={options.map(invitee => ({
                      label: invitee.name,
                      value: invitee.name,
                      id: invitee.id
                    }))}
                    className="basic-multi-select"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label>Enter Amount</Label>
                  <Input
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="Amount"
                    onChange={this.setAmountChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Currency</Label>
                  <Select
                    value={selectedCurrency}
                    onChange={this.setCurrencyChange}
                    options={currencies}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Already paid? </Label>
                  <Col>
                    <Label check>
                      <Input
                        type="radio"
                        name="paid"
                        value="yes"
                        onChange={this.handlePaidStatus}
                      />
                      Yes
                    </Label>
                  </Col>
                  <Col>
                    <Label check>
                      <Input
                        type="radio"
                        name="paid"
                        value="no"
                        onChange={this.handlePaidStatus}
                      />
                      No
                    </Label>
                  </Col>
                </FormGroup>
              </Col>
              <Col>
                <Button onClick={this.handleAddPayment}>Add Payment</Button>
              </Col>
            </Row>

            <Row>
              <Col>
                <Mutation mutation={ADD_PAYMENT}>
                  {(addPayment, { data }) => (
                    <Button
                      onClick={e => {
                        e.preventDefault();
                        addPayment({
                          variables: {
                            payments: this.state.payments
                          }
                        }).then(() => {
                          this.props.history.push({
                            pathname: `/eventDetail/${this.state.eventId}`
                          });
                        });
                      }}
                    >
                      Submit All Payments
                    </Button>
                  )}
                </Mutation>
              </Col>
            </Row>
          </Form>
        </Paper>
      </div>
    );
  }
}
export default withStyles(styles)(AddPayment);
