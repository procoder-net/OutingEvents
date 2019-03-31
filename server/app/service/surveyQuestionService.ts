import SurveyQuestion from "../entity/SurveyQuestion";
import SurveyResult from "../entity/SurveyResult";
import connectORM from "./../connection";
import Event from "../entity/Event";
import { getEventByEventId } from "./eventService";

export function createSurveyQuestion(body: any, params: any) {
  const surveyQuestion = new SurveyQuestion();
  surveyQuestion.event_id = params.event_id;
  surveyQuestion.name = body.name;
  surveyQuestion.questions = JSON.stringify({
    question: body.name,
    options: body.options
  });
  return connectORM.getRepository(SurveyQuestion).save(surveyQuestion);
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

export function getSurveyQuestionsByEventId(eventId: number) {
  return connectORM
    .getRepository(SurveyQuestion)
    .find({ event_id: eventId })
    .then(surveyQuestions => {
      surveyQuestions.forEach(function(obj: any) {
        let questionString: string = obj.questions;
        obj.questions = JSON.parse(questionString);
      });
      console.log(surveyQuestions);
      return surveyQuestions;
    })
    .catch(err => {
      throw err;
    });
}

export async function createSurveyResult(
  event: any,
  user_id: string,
  survey_question_id: number,
  result: any
) {
  const surveyResult = new SurveyResult();
  surveyResult.event =
    event instanceof Event ? event : await getEventByEventId(event);
  surveyResult.useremail = user_id;
  surveyResult.survey_id = survey_question_id;
  surveyResult.response = JSON.parse(result);
  return connectORM.getRepository(SurveyResult).save(surveyResult);
}

export function getSurveyResultByQuestionId(survey_question_id: number) {
  return connectORM
    .getRepository(SurveyResult)
    .find({ survey_question_id: survey_question_id })
    .then(surveyQuestionResults => {
      surveyQuestionResults.forEach((obj: any) => {
        obj.response = JSON.stringify(obj.response);
      });
      return surveyQuestionResults;
    })
    .catch(err => {
      throw err;
    });
}

export function getSurveyResultsByEvent(event_id: number) {
  //TODO: will do this after writing base for all services
  return {};
}
