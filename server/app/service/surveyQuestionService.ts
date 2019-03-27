import SurveyQuestion from "../entity/SurveyQuestion";
import { getRepository } from "typeorm";

export function createSurveyQuestion(body: any, params: any) {
  console.log(body);
  console.log(params);
  const surveyQuestion = new SurveyQuestion();
  surveyQuestion.event_id = params.event_id;
  surveyQuestion.name = body.name;
  surveyQuestion.questions = JSON.stringify({
    question: body.name,
    options: body.options
  });
  return surveyQuestion.save();
}

export function deleteSurveyQuestion(questionId: number) {
  return SurveyQuestion.getRepository()
    .delete(questionId)
    .then((result: any) => {
      return result;
    })
    .catch(err => {
      throw err;
    });
}

export function getSurveyQuestionsByEventId(eventId: number) {
  console.log("getSurvey");
  const surveyQuestionRepo = getRepository(SurveyQuestion);
  console.log("got repository");
  return SurveyQuestion.getRepository()
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
