import React from "react";
import ReactDOM from "react-dom";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
  FormText,
  Row
} from "reactstrap";
import Select from "react-select";
import "./eventAdd.css";
import "bootstrap/dist/css/bootstrap.min.css";
class DemoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventname: "",
      deadlinedate: "",
      deadlinetime: "",
      eventdescription: "",
      invitablelist: [
        { value: "abc@gmail.com", label: "Moyeen" },
        { value: "abc2@gmail.com", label: "Shravan" },
        { value: "abc3@gmail.com", label: "Debbie" },
        { value: "abc4@gmail.com", label: "Hari" },
        { value: "abc5@gmail.com", label: "Arturo" },
        { value: "abc6@gmail.com", label: "Kyrylo" },
        { value: "abc7@gmail.com", label: "Debbie" }
      ],
      invited: [],
      surveyOptions: [
        { value: "survey1", label: "survey1" },
        { value: "survey2", label: "survey2" },
        { value: "survey3", label: "survey3" },
        { value: "survey5", label: "survey4" }
      ],
      selectedSurvey: {},
      typeList: [
        { value: "Ski", label: "Ski" },
        { value: "Movie", label: "Movie" },
        { value: "Lunch", label: "Lunch" },
        { value: "Bowling", label: "Bowling" }
      ],
      type: {},
      validate: {
        emailState: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSurveyChange = this.handleSurveyChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  handleChange = async event => {
    const { target } = event;
    const value = target.value;
    const { name } = target;
    await this.setState({
      [name]: value
    });
  };

  handleSelectChange = async val => {
    await this.setState({
      invited: val
    });
  };

  handleSurveyChange = async val => {
    await this.setState({
      selectedSurvey: val
    });
  };

  handleTypeChange = async val => {
    await this.setState({
      type: val
    });
  };

  submitForm(e) {
    e.preventDefault();
    const eventInput = {
      name: this.state.eventname,
      description: this.state.eventdescription,
      deadlinedate: this.state.deadlinedate,
      deadlinetime: this.state.deadlinetime,
      selectedsurvey: this.state.selectedSurvey.value,
      invited: this.state.invited,
      type: this.state.type.value
    };
    console.log(`Email: ${JSON.stringify(eventInput)}`);
  }

  render() {
    const {
      eventname,
      eventdescription,
      deadlinedate,
      deadlinetime,
      invitablelist,
      invited,
      surveyOptions,
      selectedSurvey,
      typeList,
      type
    } = this.state;
    return (
      <Container className="eventForm">
        <h2>Add an Event</h2>
        <Form className="form" onSubmit={e => this.submitForm(e)}>
          <Col>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="eventname"
                name="eventname"
                id="eventname"
                placeholder="Event Name"
                value={eventname}
                valid={this.state.validate.emailState === "has-success"}
                invalid={this.state.validate.emailState === "has-danger"}
                onChange={e => {
                  //this.validateEmail(e)
                  this.handleChange(e);
                }}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="selectType">Event Type</Label>
              <Select
                value={type}
                name="selectType"
                onChange={this.handleTypeChange}
                options={typeList}
              />
            </FormGroup>
          </Col>
          <Col>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="deadlinedate">Deadline Date</Label>

                  <Input
                    type="date"
                    name="deadlinedate"
                    id="deadlinedate"
                    value={deadlinedate}
                    placeholder="date placeholder"
                    onChange={e => this.handleChange(e)}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="deadlinetime">Time</Label>
                  <Input
                    type="time"
                    name="deadlinetime"
                    id="deadlinetime"
                    value={deadlinetime}
                    placeholder="time placeholder"
                    onChange={e => this.handleChange(e)}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Col>
          <Col>
            <FormGroup>
              <Label for="eventdescription">Event Description</Label>
              <Input
                type="textarea"
                name="eventdescription"
                id="eventdescription"
                placeholder="Describe your Event"
                value={eventdescription}
                onChange={e => this.handleChange(e)}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="invited">Invite</Label>
              <Select
                isMulti
                value={invited}
                name="invited"
                onChange={this.handleSelectChange}
                options={invitablelist}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="selectSurvey">Select Survey</Label>
              <Select
                value={selectedSurvey}
                name="selectSurvey"
                onChange={this.handleSurveyChange}
                options={surveyOptions}
              />
            </FormGroup>
          </Col>
          <Col>
            <Button>Submit</Button>
          </Col>
        </Form>
      </Container>
    );
  }
}
export default DemoForm;
