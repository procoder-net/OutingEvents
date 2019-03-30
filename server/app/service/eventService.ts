import Event from "../entity/Event";
import connectORM from "./../connection";
import EventParticipant from "../entity/EventParticipant";

// get events
export function getAllEvents() {
  return connectORM
    .getRepository(Event)
    .find({ relations: ["event_participants"] })
    .then((events: any) => {
      return events;
    })
    .catch(err => {
      throw err;
    });
}

// get events by event id
export function getEventByEventId(eventId: number) {
  return connectORM
    .getRepository(Event)
    .findOne({ id: eventId, relations: ["event_participants"] })
    .then(events => {
      return events;
    })
    .catch(err => {
      throw err;
    });
}

// create event
export function addEvent(
  type: string,
  name: string,
  location: string,
  state: string,
  survey_id: number,
  start_time: Date,
  end_time: Date
) {
  const event = new Event();
  event.type = type;
  event.name = name;
  event.location = location;
  event.state = state;
  event.survey_id = survey_id;
  event.start_time = start_time.toString();
  event.end_time = end_time.toString();
  return connectORM.getRepository(Event).save(event);
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
