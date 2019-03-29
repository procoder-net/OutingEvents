import Event from "../entity/Event";
import connectORM from "./../connection";
import EventParticipant from "../entity/EventParticipant";

// get events
export function getAllEvents() {
  console.log("in get All events");
  return connectORM
    .getRepository(Event)
    .find()
    .then(events => {
      console.log(events);
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
    .find({ id: eventId })
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
  state: string
  // survey_id: number,
  // start_time: Date,
  // end_time: Date
) {
  const event = new Event();
  event.type = type;
  event.name = name;
  event.location = location;
  event.state = state;
  event.survey_id = 1;
  event.start_time = new Date(2019, 3, 1, 0, 0, 0, 0);
  event.end_time = new Date(2019, 3, 2, 0, 0, 0, 0);

  return connectORM.getRepository(Event).save(event);
}

export function addEventParticipant(
  user_id: number,
  event_id: number,
  isOrganizer: boolean
) {
  const eventParticipant = new EventParticipant();
  eventParticipant.user_id = user_id;
  eventParticipant.event_id = event_id;
  eventParticipant.is_organizer = isOrganizer;
  //when participant is created, all of these are false
  eventParticipant.attended = false;
  eventParticipant.confirmed = false;
  eventParticipant.notified = false;
  eventParticipant.tooksurvey = false;
  return connectORM.getRepository(EventParticipant).save(eventParticipant);
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
