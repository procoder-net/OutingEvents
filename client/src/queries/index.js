import { gql } from "apollo-boost";

export const GET_ALL_EVENTS = gql`
  query {
    getAllEvents {
      name
      description
    }
  }
`;

export const ADD_SURVEY_RESULT = gql`
  mutation sendSurvey($survey: SurveyResultInput) {
    createSurveyResponse(survey: $survey) {
      event
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
  query getSurveyQuestion($id: Int) {
    getSurveyQuestionsByEventId(event_id: $id) {
      id
      name
      event
      questions
    }
  }
`;
