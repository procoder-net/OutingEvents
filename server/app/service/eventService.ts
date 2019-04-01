import Event from "../entity/Event";
import connectORM from "./../connection";
import * as EventParticipant from "./eventParticipantService";
import SurveyQuestion from "../entity/SurveyQuestion";
const sendSurveyEmail = require("../mail").sendSurveyEmail;
// get events
export function getAllEvents() {
  return connectORM
    .getRepository(Event)
    .find({
      relations: [
        "event_participants",
        "survey_result",
        "payments",
        "survey_question",
        "receipt"
      ]
    })
    .then((events: any) => {
      return events;
    })
    .catch(err => {
      throw err;
    });
}

// get events by event id
export function getEventByEventId(eventId: number): Promise<any> {
  return connectORM
    .getRepository(Event)
    .findOne({
      id: eventId,
      relations: [
        "event_participants",
        "survey_result",
        "payments",
        "survey_question",
        "receipt"
      ]
    })
    .then(events => {
      return events;
    })
    .catch(err => {
      throw err;
    });
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
  invites: [string]
) {
  const event = new Event();
  event.type = type;
  event.name = name;
  event.location = location;
  event.state = state;
  event.event_date = event_date;
  event.deadline_date = deadline_date;
  event.description = description;
  event.survey_id = survey_id;
  var createdEvent = await connectORM.getRepository(Event).save(event);
  invites.forEach(async invite => {
    await EventParticipant.addEventParticipant(
      invite,
      event.id,
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
