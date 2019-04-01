import SurveyQuestion from "../entity/SurveyQuestion";
import SurveyResult from "../entity/SurveyResult";
import connectORM from "./../connection";
import Event from "../entity/Event";
import EventParticipant from "../entity/EventParticipant";

export async function createSurveyQuestion(body: any, params: any) {
  const surveyQuestion = new SurveyQuestion();
  const event_id = params.event_id;
  surveyQuestion.name = body.name;
  surveyQuestion.questions = JSON.stringify({
    question: body.name,
    options: body.options
  });
  const event: any = await connectORM
    .getRepository(Event)
    .findOne({ id: event_id, relations: ["survey_question"] });
  event.survey_question = surveyQuestion;
  surveyQuestion.event = event;
  await connectORM.getRepository(Event).save(event);
  return surveyQuestion;
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
    .find({ event_id: eventId, relations: ["event"] })
    .then(surveyQuestions => {
      return surveyQuestions;
    })
    .catch(err => {
      throw err;
    });
}

export async function createSurveyResult(
  event_id: number,
  participant_id: number,
  survey_question_id: number,
  result: any
) {
  const surveyResult = new SurveyResult();
  surveyResult.response = JSON.parse(result);
  const eventRepo = connectORM.getRepository(Event);
  const eventParticipantRepo = connectORM.getRepository(EventParticipant);
  const surveyQuestionRepo = connectORM.getRepository(SurveyQuestion);
  const event: any = await eventRepo.findOne({
    id: event_id,
    relations: ["survey_result"]
  });
  const eventParticipant: any = await eventParticipantRepo.findOne({
    id: participant_id,
    relations: ["survey_results"]
  });
  const surveyQuestion: any = await surveyQuestionRepo.findOne({
    id: survey_question_id,
    relations: ["survey_results"]
  });
  if (event && eventParticipant && surveyQuestion) {
    event.survey_result.push(surveyResult);
    eventParticipant.survey_results.push(surveyResult);
    surveyQuestion.survey_results.push(surveyResult);
    await eventRepo.save(event);
    await eventParticipantRepo.save(eventParticipant);
    await surveyQuestionRepo.save(surveyQuestion);
    return surveyResult;
  }
  return connectORM.getRepository(SurveyResult).save(surveyResult);
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
