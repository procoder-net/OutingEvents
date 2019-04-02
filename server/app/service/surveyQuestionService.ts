import SurveyQuestion from "../entity/SurveyQuestion";
import SurveyResult from "../entity/SurveyResult";
import connectORM from "./../connection";
import Event from "../entity/Event";
import { getEventByEventId } from "./eventService";
import { InsertQueryBuilder } from "typeorm";

export async function createSurveyQuestion(
  event_id: number,
  name: string,
  formattedquestion: any,
  questions: any
) {
  const surveyQuestion = new SurveyQuestion();
  surveyQuestion.event = event_id;
  surveyQuestion.name = name;
  surveyQuestion.formattedquestion = formattedquestion;
  surveyQuestion.questions = questions;
  let surveyq = await connectORM
    .getRepository(SurveyQuestion)
    .save(surveyQuestion);
  return surveyq;
}

export async function updateSurveyQuestionbyEventId(
  id: any,
  formattedquestion: any
) {
  await connectORM
    .getRepository(SurveyQuestion)
    .findOne({ event: id })
    .then((surveyq: any) => {
      console.log(id);
      console.log(formattedquestion);
      console.log(surveyq);
      if (!surveyq.formattedquestion) {
        console.log(surveyq);
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

export function getSurveyQuestionsByEventId(eventId: number) {
  return connectORM
    .getRepository(SurveyQuestion)
    .find({ event: eventId })
    .then((surveyQuestions: any) => {
      /* surveyQuestions.forEach(function (obj: any) {
                let questionString: string = obj.questions;
                obj.questions = JSON.parse(questionString);
            }); */
      let responseSurvey = surveyQuestions[0];
      responseSurvey.questions = JSON.stringify(responseSurvey.questions);
      responseSurvey.formattedquestion = JSON.stringify(
        responseSurvey.formattedquestion
      );
      console.log(responseSurvey);
      return responseSurvey;
    })
    .catch(err => {
      throw err;
    });
}

export async function createSurveyResult(
  event: any,
  surveyId: number,
  useremail: string,
  result: any
) {
  const surveyResult = new SurveyResult();
  surveyResult.event = event;
  // /event instanceof Event ? event : await getEventByEventId(event);
  surveyResult.useremail = useremail;
  surveyResult.survey_id = surveyId;
  surveyResult.response = result;
  let surveyResp = await connectORM
    .getRepository(SurveyResult)
    .save(surveyResult);
  return surveyResp;
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
