import SurveyQuestion from "./entity/SurveyQuestion";

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
  console.log(surveyQuestion);
  return surveyQuestion.save();
}

export function deleteSurveyQuestion(questionId: number) {
  return SurveyQuestion.getRepository()
    .delete(questionId)
    .then(result => {
      return result;
    })
    .catch(err => {
      throw err;
    });
}

export function getSurveyQuestionsByEventId(eventId: number) {
  return SurveyQuestion.getRepository()
    .find({ event_id: eventId })
    .then(surveyQuestions => {
      surveyQuestions.forEach(function(obj) {
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
