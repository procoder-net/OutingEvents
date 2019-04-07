import Event from "../entity/Event";
import connectORM from "./../connection";
import * as EventParticipant from "./eventParticipantService";
import { getSurveyQuestionsBySurveyId } from "./surveyQuestionService";
const sendSurveyEmail = require("../mail").sendSurveyEmail;
import { In, Between } from "typeorm";

const populate = ["survey", "event_participants", "survey_results"];
// get events

function convertDate(events: any) {
  return events.map((event: any) => {
    let dd = new Date(event.deadline_date);
    let ed = new Date(event.event_date);
    event.deadline_date = dd.toDateString().toString();
    event.event_date = dd.toDateString().toString();
    return event;
  });
}

export async function getAllEvents(populateRelations = true) {
  let relations = populateRelations ? populate : [];
  let events = await await connectORM.getRepository(Event).find({
    relations: relations
  });
  return convertDate(events);
}

export async function getAllEventsByUser(
  user: string,
  populateRelations = true
) {
  let relations = populateRelations ? populate : [];
  console.log(user);
  let participatingEvents = await EventParticipant.getEventParticipantsByUser(
    user,
    null,
    true
  );

  let eventIds = participatingEvents
    .map((pe: any) => pe.event)
    .map((event: any) => event.id);
  if (eventIds.length > 0) {
    return await getEventByEventId(eventIds);
  }
  return [];
}

export async function getAllEventsByDeadlineDate() {
  let startDate = new Date(Date.now());
  startDate.setHours(0, 0, 0, 0);
  let endDate = new Date(Date.now());
  endDate.setDate(startDate.getDate() + 1);
  let find: any = {
    where: {
      state: "Survey",
      deadline_date: Between(startDate, endDate)
    }
  };
  return await connectORM
    .getRepository(Event)
    .find(find)
    .then(events => {
      return events;
    })
    .catch(err => {
      throw err;
    });
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
  return convertDate(event);
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
export function updateEventNameByEventId(id: number, params: any) {
  let update: any = {};
  if (params.name) update.name = params.name;
  if (params.state) update.state = params.state;
  if (params.type) update.type = params.type;
  if (params.image) update.type = params.image;
  if (params.location) update.location = params.location;
  if (params.description) update.description = params.description;
  return connectORM
    .getRepository(Event)
    .update({ id: id }, update)
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
