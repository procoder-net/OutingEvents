import SurveyQuestion from "../entity/SurveyQuestion";
import SurveyResult from "../entity/SurveyResult";
import connectORM from "./../connection";
import Event from "../entity/Event";

export async function createSurveyQuestion(
  name: string,
  formattedquestion: any,
  questions: any
) {
  const surveyQuestion = new SurveyQuestion();
  surveyQuestion.name = name;
  surveyQuestion.formattedquestion = formattedquestion;
  surveyQuestion.questions = questions;
  let surveyq = await connectORM
    .getRepository(SurveyQuestion)
    .save(surveyQuestion);
  return surveyq;
}

export async function updateSurveyQuestion(id: any, formattedquestion: any) {
  await connectORM
    .getRepository(SurveyQuestion)
    .findOne(id)
    .then((surveyq: any) => {
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
    .find({ event_id: eventId, relations: ["event"] })
    .then(surveyQuestions => {
      return surveyQuestions;
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
  const survey_question: any = await connectORM
    .getRepository(SurveyQuestion)
    .findOne({ id: surveyId, relations: ["survey_results"] });
  surveyResult.response = result;
  surveyResult.survey_question = survey_question;
  survey_question.survey_results.push(surveyResult);
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
