import * as surveyQuestionService from "./service/surveyQuestionService";
import * as eventParticipantService from "./service/eventParticipantService";
import * as receiptService from "./service/receiptService";
import * as paymentService from "./service/paymentService";
import * as userService from "./service/userService";
import * as eventService from "./service/eventService";

var emailSurvey = require("./mail").sendSurveyEmail;

exports.resolvers = {
  Query: {
    getAllEvents: (root: any, args: any) => {
      console.log(root);
      console.log("resolver");
      return eventService.getAllEvents();
    },

    getEventByEventId: (oot: any, args: any) => {
      return eventService.getEventByEventId(args.event_id);
    },

    getAllSurveyQuestions: (root: any, args: any) => {
      return surveyQuestionService.getSurveyQuestionsByEventId(args.event_id);
    },
    getAllEventParticipants: (root: any, args: any) => {
      return eventParticipantService.getEventParticipants(args.event_id);
    },
    getReceiptByEvent: (root: any, args: any) => {
      return receiptService.getReceiptsByEventId(args.event_id);
    },
    getPaymentByEvent: (root: any, args: any) => {
      return paymentService.getPaymentInformationByEventId(args.event_id);
    },
    getSurveyResponsesByQuestionId: (root: any, args: any) => {
      return surveyQuestionService.getSurveyResultByQuestionId(
        args.survey_question_id
      );
    },
    getAllUserProfiles: (root: any, args: any) => {
      return userService.getAllUserProfiles();
    },
    getUserProfile: (root: any, args: any) => {
      return userService.getUserProfileById(args.id);
    }
  },

  Mutation: {
    addEvent: (root: any, args: any) => {
      console.log("addevent");
      return eventService.addEvent({
        type: args.type,
        name: args.name,
        location: args.location,
        state: args.state,
        survey: args.surey,
        start_time: args.start_time,
        end_time: args.end_time
      });
    },

    updateEventNameByEventId: (root: any, args: any) => {
      return eventService.updateEventNameByEventId(
        {
          id: args.id,
          name: args.name
        },
        { id: args.id, name: args.name }
      );
    },

    // deleteEventById: (root: any, args: any) => {
    //   return eventService.deleteEventById(args.id);
    // },

    sendSurveyEmail: (root: any, args: any) =>
      emailSurvey(args.eventId, args.eventName, args.surveyId, args.emailList),
    addSurveyQuestion: (root: any, args: any) => {
      return surveyQuestionService.createSurveyQuestion(
        { name: args.name, questions: args.questions },
        { event_id: args.event_id }
      );
    },
    deleteSurveyQuestion: (root: any, args: any) => {
      return surveyQuestionService.deleteSurveyQuestion(args.id);
    },
    addEventParticipant: (root: any, args: any) => {
      return eventParticipantService.addEventParticipant(
        args.user_id,
        args.event_id,
        args.is_organizer
      );
    },
    updateEventParticipant: (root: any, args: any) => {
      const updatedStatus = {
        is_organizer: args.is_organizer,
        notified: args.notified,
        confirmed: args.confirmed,
        attended: args.attended,
        tooksurvey: args.tooksurvey
      };
      return eventParticipantService.updateEventParticipantStatus(
        args.id,
        updatedStatus
      );
    },
    removeEventParticipant: (root: any, args: any) => {
      return eventParticipantService.removeEventParticipant(args.id);
    },
    addReceipt: (root: any, args: any) => {
      const body = {
        vendor: args.vendor,
        description: args.description || "",
        amount: args.amount,
        currency: args.currency
      };
      return receiptService.createReceipt(args.event_id, body);
    },
    deleteReceipt: (root: any, args: any) => {
      return receiptService.deleteReceipt(args.id);
    },
    createPayment: (root: any, args: any) => {
      const paymentDetails = {
        currency: args.currency,
        description: args.description,
        amount: args.amount
      };
      return paymentService.createPayment(
        args.event_id,
        args.user_id,
        args.payment_status,
        paymentDetails
      );
    },
    updatePaymentStatus: (root: any, args: any) => {
      const filter = {
        id: args.id
      };
      return paymentService.updatePaymentStatus(filter, args.new_status);
    },
    createUserProfile: (root: any, args: any) => {
      return userService.createUserProfile(args);
    },
    createSurveyResponse: (root: any, args: any) => {
      return surveyQuestionService.createSurveyResult(
        args.survey_question_id,
        args.event_id,
        args.user_id,
        args.response
      );
    }
  }
};
