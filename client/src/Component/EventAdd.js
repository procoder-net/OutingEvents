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
  Row,
  Media
} from "reactstrap";
import Select from "react-select";
import "./eventAdd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
const defaultImagePath = "/api/content/default/";
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
      type: { value: "Ski", label: "Ski" },
      image: "",
      imageUrl: "",
      imageLoaded: true,
      validate: {
        emailState: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSurveyChange = this.handleSurveyChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleDefaultImage = this.handleDefaultImage.bind(this);
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
    this.setState({
      imageUrl: "",
      image: ""
    });
    await this.setState({
      type: val
    });
    this.handleDefaultImage();
  };

  handleImageChange = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", e.target.files[0]);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post("api/upload", formData, config)
      .then(response => {
        this.setState({
          imageLoaded: true,
          imageUrl: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleDefaultImage = () => {
    const defaultImage = {
      Ski: {
        1: "ski1.jpg",
        2: "ski2.jpg",
        3: "ski3.jpg",
        4: "ski4.jpg"
      },
      Lunch: {
        1: "lunch1.jpg",
        2: "lunch2.jpg",
        3: "lunch3.jpg",
        4: "lunch4.jpg"
      },
      Movie: {
        1: "Movie1.jpg",
        2: "Movie2.jpg",
        3: "Movie3.jpg",
        4: "Movie4.jpg"
      },
      Bowling: {
        1: "bowling1.jpg",
        2: "bowling2.jpg",
        3: "bowling3.jpg",
        4: "bowling4.jpg"
      }
    };
    if (!this.state.imageUrl) {
      const a =
        defaultImagePath +
        defaultImage[this.state.type.value][Math.floor(Math.random() * 4) + 1];
      console.log(a);
      this.setState({
        imageUrl: a
      });
    }
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
      type: this.state.type,
      image: this.state.imageUrl
    };
    this.props.handleSubmit(this.props.addEvent, eventInput);
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
      type,
      image,
      imageUrl,
      imageLoaded
    } = this.state;
    this.handleDefaultImage();
    return (
      <Container className="eventForm">
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
            <FormGroup>
              {!imageLoaded ? (
                <svg width="200" height="200" viewBox="0 0 200 200">
                  <rect width="200" height="200" rx="10" ry="10" fill="#CCC" />
                </svg>
              ) : (
                <Media object src={imageUrl} className="my_image" />
              )}
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="inputImage">Event Image</Label>
              <Input
                type="file"
                name="image"
                id="image"
                onChange={this.handleImageChange}
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
