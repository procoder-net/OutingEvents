const css = require("../App.css");

import React from "react";
import Select from "react-select";
import {
  Input,
  Button,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Container,
  Label,
  Table,
  FormGroup,
  Form
} from "reactstrap";
import ReactDOM from "react-dom";
const options = [
  { value: "abc@gmail.com", label: "Moyeen" },
  { value: "abc2@gmail.com", label: "Shravan" },
  { value: "abc3@gmail.com", label: "Debbie" },
  { value: "abc4@gmail.com", label: "Hari" },
  { value: "abc5@gmail.com", label: "Arturo" },
  { value: "abc6@gmail.com", label: "Kyrylo" }
];

const boxStyle = {};

const currencies = [
  { value: "usd", label: "US Dollars" },
  { value: "eur", label: "Euros" },
  { value: "jpy", label: "Japanese Yen" }
];

const TableContent = props => {
  return props.payments.map((payment, index) => {
    return (
      <tbody>
        <tr>
          <th scope="row">{index}</th>
          <td>{payment.name}</td>
          <td>
            {payment.amount} {payment.currency}
          </td>
          <td>N</td>
        </tr>
      </tbody>
    );
  });
};

class AddPayment extends React.Component {
  state = {
    payments: [{ name: "Shravan", amount: 12, currency: "usd" }]
  };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.setCurrencyChange = this.setCurrencyChange.bind(this);
    this.handleSubmitPayment = this.handleSubmitPayment.bind(this);
    this.handleAddPayment = this.handleAddPayment.bind(this);
    this.setCurrencyChange = this.setCurrencyChange.bind(this);
  }

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

  handleSubmitPayment = event => {
    alert("payment was submitted ");
    event.preventDefault();
  };

  handleAddPayment = event => {
    const paymentList = this.state.payments;
    const paymentInfo = {
      name: this.state.selectedInvitee.label,
      amount: this.state.selectedAmount,
      currency: this.state.selectedCurrency.label
    };
    paymentList.push(paymentInfo);
    this.setState({ payments: paymentList });
    event.preventDefault();
  };

  render() {
    const { selectedInvitee } = this.state;
    const { selectedCurrency } = this.state;
    return (
      <Container>
        <h2>Payments Summary</h2>
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
                  options={options}
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
              <Label>Already paid?</Label>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="paid" /> Yes
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="paid" /> No
                </Label>
              </FormGroup>
            </Col>
            <Col>
              <Button onClick={this.handleAddPayment}>Add Payment</Button>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button onClick={this.handleSubmitPayment}>
                Submit All Payment(s)
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}
export default AddPayment;
