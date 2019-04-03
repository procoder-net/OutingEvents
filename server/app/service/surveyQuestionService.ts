import SurveyQuestion from "../entity/SurveyQuestion";
import SurveyResult from "../entity/SurveyResult";
import connectORM from "./../connection";
import { default as Event } from "../entity/Event";
import { getEventByEventId } from "./eventService";
import { getEventParticipants } from "./eventParticipantService";
import EventParticipant from "../entity/EventParticipant";

export async function createSurveyQuestion(
  user: string,
  formattedquestion: any,
  questions: any
) {
  const surveyQuestion = new SurveyQuestion();
  surveyQuestion.user = user;
  if (formattedquestion !== "null") {
    surveyQuestion.formattedquestion = formattedquestion;
  }
  surveyQuestion.questions = questions;
  let surveyq = await connectORM
    .getRepository(SurveyQuestion)
    .save(surveyQuestion);
  return surveyq;
}

export async function updateSurveyQuestionbyId(
  id: any,
  formattedquestion: any
) {
  await connectORM
    .getRepository(SurveyQuestion)
    .findOne({ id: id })
    .then((surveyq: any) => {
      if (!surveyq.formattedquestion) {
        surveyq.formattedquestion = formattedquestion;
        return connectORM.getRepository(SurveyQuestion).save(surveyq);
      }
      return true;
    });
}

export function deleteSurveyQuestion(questionId: number) {
  return connectORM
    .getRepository(SurveyQuestion)
    .delete(questionId)
    .then((result: any) => {
      return result;
    })
    .catch(err => {
      throw err;
    });
}

export function getAllSurveyQuestions() {
  return getSurveyQuestionsBySurveyId();
}
export function getSurveyQuestionsBySurveyId(surveyId?: number) {
  let find = surveyId ? { id: surveyId } : {};
  return connectORM
    .getRepository(SurveyQuestion)
    .find(find)
    .then((surveyQuestions: any) => {
      let surveyq = surveyQuestions.map((sq: SurveyQuestion) => {
        sq.questions = JSON.stringify(sq.questions);
        sq.formattedquestion = JSON.stringify(sq.formattedquestion);
        return sq;
      });
      return surveyq;
    })
    .catch(err => {
      throw err;
    });
}

export async function getSurveyQuestionsByEventId(eventId: number) {
  let events: any = await getEventByEventId(eventId);
  return [events[0].survey];
}

export async function createSurveyResult(
  eventId: any,
  surveyId: number,
  user: string,
  participantId: number,
  result: any
) {
  const surveyResult = new SurveyResult();
  surveyResult.user = user;
  surveyResult.event = await getEventByEventId(eventId, false);
  surveyResult.event_participant = await getEventParticipants(
    eventId,
    participantId
  );
  surveyResult.response = result;
  surveyResult.survey_question = surveyId;

  let surveyResultResp = await connectORM
    .getRepository(SurveyResult)
    .save(surveyResult)
    .catch(err => {
      throw err;
    });
  return surveyResultResp;
}

const populateSurveyResults = ["event_participant", "event"];
export function getSurveyResultsByEvent(
  event_id: number,
  partipant_id?: number,
  populateRelations = true
) {
  let find: any = { event_id: event_id };
  if (partipant_id) {
    find.participant_id = partipant_id;
  }
  if (populateRelations) {
    find.relations = populateSurveyResults;
  }
  return connectORM
    .getRepository(SurveyResult)
    .find(find)
    .then((surveyResults: any) => {
      return surveyResults.map((sr: SurveyResult) => {
        sr.response = JSON.stringify(sr.response);
        return sr;
      });
    })
    .catch(err => {
      throw err;
    });
}

// tested get and add
// need to test update and delete
