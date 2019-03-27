import * as surveyQuestionService from "./service/surveyQuestionService";
var emailSurvey = require("./mail").sendSurveyEmail;

exports.resolvers = {
  Query: {
    getAllEvents: () => {},
    getAllSurveyQuestions: (root: any, args: any) => {
      console.log(args);
      return surveyQuestionService.getSurveyQuestionsByEventId(args.event_id);
    }
  },

  Mutation: {
    addEvent: () => {},
    sendSurveyEmail: (root: any, args: any) =>
      emailSurvey(args.eventId, args.eventName, args.surveyId, args.emailList),
    addSurveyQuestion: (root: any, args: any) => {
      console.log("args");
      console.log(args);
      return surveyQuestionService.createSurveyQuestion(
        { name: args.name, questions: args.questions },
        { event_id: args.event_id }
      );
    },
    deleteSurveyQuestion: (root: any, args: any) => {
      return surveyQuestionService.deleteSurveyQuestion(args.id);
    }
  }
};
