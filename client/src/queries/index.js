import { gql } from "apollo-boost";

export const GET_ALL_EVENTS = gql`
  query {
    allEvents {
      id
      name
      description
      image
      event_date
    }
  }
`;

export const GET_EVENT = gql`
  query getEvent($event: Int!) {
    event(eventId: $event) {
      id
      name
      description
      image
      deadline_date
      event_date
      location
      event_participants {
        id
        user
        is_organizer
        confirmed
        attended
      }
    }
  }
`;

export const ADD_SURVEY_RESULT = gql`
  mutation sendSurvey($survey: SurveyResultInput) {
    addSurveyResult(survey: $survey) {
      id
    }
  }
`;

export const ADD_EVENT = gql`
  mutation addEvent($event: EventInput) {
    addEvent(event: $event) {
      id
      name
      description
    }
  }
`;

export const GET_SURVEY_QUESTION = gql`
  query getSurveyQuestion($id: Int!) {
    survey(surveyId: $id) {
      id
      user
      questions
    }
  }
`;

export const ADD_PAYMENT = gql`
  mutation($payments: [PaymentInput]) {
    createPaymentEntry(payments: $payments) {
      event_id
    }
  }
`;
