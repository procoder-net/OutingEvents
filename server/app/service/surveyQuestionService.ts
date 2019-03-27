import SurveyQuestion from "../entity/SurveyQuestion";
import connectORM from "./../connection";

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
  console.log("getSurvey");
  console.log("got repository");
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
