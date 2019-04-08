import * as surveyQuestionService from "./service/surveyQuestionService";
import * as eventParticipantService from "./service/eventParticipantService";
import * as receiptService from "./service/receiptService";
import * as paymentService from "./service/paymentService";
import * as userService from "./service/userService";
import * as eventService from "./service/eventService";
import { AfterInsert } from "typeorm";
import SurveyQuestion from "./entity/SurveyQuestion";
import { resolve } from "path";

var emailSurvey = require("./mail").sendSurveyEmail;

exports.resolvers = {
  Query: {
    allEvents: async (root: any, args: any) => {
      return await eventService.getAllEvents();
    },
    allEventsByUser: async (root: any, args: any) => {
      return await eventService.getAllEventsByUser(args.user);
    },
    event: async (root: any, args: any) => {
      let events: any = await eventService.getEventByEventId(args.eventId);
      return events[0];
    },
    eventParticipants: async (root: any, args: any) => {
      return await eventParticipantService.getEventParticipants(args.eventId);
    },
    eventParticipantsByUser: async (root: any, args: any) => {
      return await eventParticipantService.getEventParticipantsByUser(
        args.user
      );
    },
    allSurvey: async (root: any, args: any) => {
      return await surveyQuestionService.getAllSurveyQuestions();
    },
    survey: async (root: any, args: any) => {
      let surveys = await surveyQuestionService.getSurveyQuestionsBySurveyId(
        args.surveyId
      );
      console.log("counting starts");
      let abc = await surveyQuestionService.getCountedSurveyResultsByEvent(1);
      console.log(JSON.stringify(abc));
      return surveys[0];
    },
    surveyResults: async (root: any, args: any) => {
      return await surveyQuestionService.getSurveyResultsByEvent(
        args.event_id,
        args.participant_id
      );
    },

    getCountedSurveyResultsByEvent: async (root: any, args: any) => {
      return await surveyQuestionService.getCountedSurveyResultsByEvent(
        args.event_id
      );
    },

    getAllEvents: (root: any, args: any) => {
      console.log("the resolver root is: " + root);
      return eventService.getAllEvents();
    },

    getEventByEventId: (oot: any, args: any) => {
      return eventService.getEventByEventId(args.event_id);
    },

    /* getSurveyQuestionsByEventId: (root: any, args: any) => {
                                 return surveyQuestionService.getSurveyQuestionsByEventId(args.event_id);
                             }, */
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
      /*return surveyQuestionService.getSurveyResultByQuestionId(
                                              args.survey_question_id
                                          ); */
    },
    getAllUserProfiles: (root: any, args: any) => {
      return userService.getAllUserProfiles();
    },
    getUserProfile: (root: any, args: any) => {
      return userService.getUserProfileById(args.id);
    }
  },
  Event: {
    event_participants: {
      resolve(event: any, args: any, context: any, info: any) {
        let id;
        return eventParticipantService.getEventParticipants(
          event.id,
          id,
          false
        );
      }
    },
    survey: {
      resolve(event: any, args: any, context: any, info: any) {
        return surveyQuestionService.getSurveyQuestionsByEventId(event.id);
      }
    },
    survey_result: {
      resolve(event: any, args: any, context: any, info: any) {
        return surveyQuestionService.getSurveyResultsByEvent(event.id);
      }
    }
  },
  EventParticipant: {
    event: {
      resolve(event_participants: any, args: any, context: any, info: any) {
        return event_participants.event;
      }
    },
    surveyResult: {
      resolve(event_participants: any, args: any, context: any, info: any) {
        return event_participants.survey_results;
      }
    },
    payment: {
      resolve(event_participants: any, args: any, context: any, info: any) {
        return event_participants.payments;
      }
    }
  },
  SurveyResult: {
    event_participants: {
      resolve(surveyResults: any, args: any, context: any, info: any) {
        return surveyResults.event_participant;
      }
    }
  },
  Mutation: {
    addEvent: async (root: any, args: any, context: any) => {
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
        event.deadlineDatetime.month - 1,
        event.deadlineDatetime.day,
        event.deadlineDatetime.hour,
        event.deadlineDatetime.minute
      );
      return await eventService.addEvent(
        event.type,
        event.name,
        event.location,
        "Survey",
        event.survey,
        event.description,
        eventDate,
        deadlineDate,
        event.invited,
        event.image,
        context.req.headers.host
      );
    },
    addSurvey: async (root: any, args: any) => {
      return await surveyQuestionService.createSurveyQuestion(
        args.question.user,
        args.question.formattedquestion,
        args.question.questions
      );
    },
    addSurveyResult: async (root: any, args: any) => {
      let createQ = await surveyQuestionService.updateSurveyQuestionbyId(
        args.survey.survey_id,
        args.survey.surveyquestion
      );
      let response = await surveyQuestionService.createSurveyResult(
        args.survey.event_id,
        args.survey.survey_id,
        args.survey.user,
        args.survey.participant_id,
        args.survey.response
      );
      return response;
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
      return surveyQuestionService.createSurveyQuestion(
        args.name,
        args.formattedquestion,
        args.question
      );
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

    createPaymentEntry: (root: any, args: any) => {
      const result: any = [];
      args.payments.forEach((payment: any) => {
        const paymentDetails = {
          currency: payment.currency,
          description: payment.description || "",
          amount: payment.amount
        };
        result.push(
          paymentService.createPayment(
            payment.event_id,
            payment.participant_id,
            payment.status,
            paymentDetails
          )
        );
      });
      return result;
    },

    updatePaymentStatus: (root: any, args: any) => {
      const filter = {
        id: args.id
      };
      return paymentService.updatePaymentStatus(filter, args.new_status);
    },
    createUserProfile: (root: any, args: any) => {
      return userService.createUserProfile(args);
    }
  }
};
