import SurveyQuestion from "../entity/SurveyQuestion";
import SurveyResult from "../entity/SurveyResult";
import connectORM from "./../connection";
import { default as Event } from "../entity/Event";
import EventParticipant from "../entity/EventParticipant";

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
    .find({ event_id: eventId, relations: ["survey_results"] })
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
  eventId: any,
  surveyId: number,
  useremail: string,
  participantId: number,
  result: any
) {
  const surveyResult = new SurveyResult();
  // /event instanceof Event ? event : await getEventByEventId(event);
  surveyResult.useremail = useremail;
  const event: any = await connectORM
    .getRepository(Event)
    .findOne({ id: eventId, relations: ["survey_result"] });
  const survey_question: any = await connectORM
    .getRepository(SurveyQuestion)
    .findOne({ id: surveyId, relations: ["survey_results"] });
  const event_participant: any = await connectORM
    .getRepository(EventParticipant)
    .findOne({ id: surveyId, relations: ["survey_results"] });
  surveyResult.response = result;
  surveyResult.event = event;
  surveyResult.survey_question = survey_question;
  event.survey_result.push(surveyResult);
  survey_question.survey_results.push(surveyResult);
  event_participant.survey_results.push(surveyResult);
  await connectORM.getRepository(SurveyQuestion).save(survey_question);
  await connectORM.getRepository(EventParticipant).save(event_participant);
  await connectORM.getRepository(Event).save(event);
  return surveyResult;
}

export function getSurveyResultByQuestionId(survey_question_id: number) {
  return connectORM
    .getRepository(SurveyResult)
    .find({
      survey_question_id: survey_question_id,
      relations: ["event", "event_participant", "survey_question"]
    })
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
