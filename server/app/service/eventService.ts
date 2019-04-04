import Event from "../entity/Event";
import connectORM from "./../connection";
import * as EventParticipant from "./eventParticipantService";
import { getSurveyQuestionsBySurveyId } from "./surveyQuestionService";
const sendSurveyEmail = require("../mail").sendSurveyEmail;
import { In } from "typeorm";
const populate = ["survey", "event_participants", "survey_results"];
// get events
export async function getAllEvents(populateRelations = true) {
  let relations = populateRelations ? populate : [];
  let events = await await connectORM
    .getRepository(Event)
    .find({ relations: relations });
  return events;
}

export async function getAllEventsByUser(
  user: string,
  populateRelations = true
) {
  let relations = populateRelations ? populate : [];
  let participatingEvents = await EventParticipant.getEventParticipantsByUser(
    user,
    true
  );
  let eventIds = participatingEvents
    .map((pe: any) => pe.event)
    .map((event: any) => event.id);
  return await getEventByEventId(eventIds);
}

// get events by event id
export async function getEventByEventId(
  eventId?: any,
  populateRelations = true
): Promise<any> {
  eventId = eventId instanceof Array ? eventId : [eventId];
  let relations = populateRelations ? populate : [];
  let find: any = {
    where: {
      id: In(eventId)
    }
  };
  if (populateRelations) {
    find.relations = relations;
  }
  let event = await connectORM
    .getRepository(Event)
    .find(find)
    .then(events => {
      return events;
    })
    .catch(err => {
      throw err;
    });
  return event;
}

// create event
export async function addEvent(
  type: string,
  name: string,
  location: string,
  state: string,
  survey_id: number,
  description: string,
  event_date: Date,
  deadline_date: Date,
  invites: [string],
  image: string
) {
  const event = new Event();
  event.type = type;
  event.name = name;
  event.location = location;
  event.state = state;
  event.event_date = event_date;
  event.deadline_date = deadline_date;
  event.description = description;
  event.image = image;
  let survey = await getSurveyQuestionsBySurveyId(survey_id);
  event.survey = survey instanceof Array ? survey[0] : survey;
  var createdEvent = await connectORM
    .getRepository(Event)
    .save(event)
    .catch(err => {
      throw err;
    });
  invites.forEach(async invite => {
    await EventParticipant.addEventParticipant(
      invite,
      createdEvent,
      true,
      true,
      false
    );
  });
  await sendSurveyEmail(createdEvent.id, createdEvent.name, survey_id, invites);
  return createdEvent;
}

// update event name value by event id
export function updateEventNameByEventId(body: any, paramas: any) {
  return connectORM
    .getRepository(Event)
    .update({ id: paramas.id }, { name: paramas.name })
    .then(result => {
      return connectORM.getRepository(Event).findOne(paramas.id);
    })
    .catch(err => {
      throw err;
    });
}

//delete Event by event id
export function deleteEventById(id: number) {
  return connectORM
    .getRepository(Event)
    .remove({ id: id })
    .then(result => {
      return connectORM.getRepository(Event).find();
    })
    .catch(err => {
      throw err;
    });
}

// tested get and add
// need to test update and delete
