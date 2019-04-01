import * as surveyQuestionService from "./service/surveyQuestionService";
import * as eventParticipantService from "./service/eventParticipantService";
import * as receiptService from "./service/receiptService";
import * as paymentService from "./service/paymentService";
import * as userService from "./service/userService";
import * as eventService from "./service/eventService";
import { AfterInsert } from "typeorm";

var emailSurvey = require("./mail").sendSurveyEmail;

exports.resolvers = {
  Query: {
    getAllEvents: (root: any, args: any) => {
      console.log("the resolver root is: " + root);
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
    addEvent: async (root: any, args: any) => {
      console.log(args);
      const event = args.event;
      const eventDate: Date = new Date(
        event.eventDateTime.year,
        event.eventDateTime.month,
        event.eventDateTime.day,
        event.eventDateTime.hour,
        event.eventDateTime.minute
      );
      const deadlineDate: Date = new Date(
        event.deadlineDatetime.year,
        event.deadlineDatetime.month,
        event.deadlineDatetime.day,
        event.deadlineDatetime.hour,
        event.deadlineDatetime.minute
      );
      await eventService.addEvent(
        event.type,
        event.name,
        event.location,
        "Draft",
        event.surveyId,
        event.description,
        eventDate,
        deadlineDate,
        event.invited
      );
    },

    /*  updateEventNameByEventId: (root: any, args: any) => {
                      return eventService.updateEventNameByEventId(
                          {
                              id: args.id,
                              name: args.name
                          },
                          { id: args.id, name: args.name }
                      );
                      console.log(args);
                  }, */

    deleteEventById: (root: any, args: any) => {
      return eventService.deleteEventById(args.id);
    },

    sendSurveyEmail: (root: any, args: any) =>
      emailSurvey(args.eventId, args.eventName, args.surveyId, args.emailList),
    addSurveyQuestion: (root: any, args: any) => {
      /*    return surveyQuestionService.createSurveyQuestion(
                    { name: args.name, questions: args.questions },
                    { event_id: args.event_id }
                );*/
    },
    deleteSurveyQuestion: (root: any, args: any) => {
      return surveyQuestionService.deleteSurveyQuestion(args.id);
    },
    addEventParticipant: (root: any, args: any) => {
      /*return eventParticipantService.addEventParticipant(
                            args.usernemail,
                            args.event_id,
                            args.is_organizer
                        );*/
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
    createSurveyResponse: async (root: any, args: any) => {
      let createQ = await surveyQuestionService.updateSurveyQuestion(
        args.survey.surveyId,
        args.survey.surveyquestion
      );
      let response = await surveyQuestionService.createSurveyResult(
        args.survey.eventId,
        args.survey.surveyId,
        args.survey.useremail,
        args.survey.response
      );
      return response;
    }
  }
};
