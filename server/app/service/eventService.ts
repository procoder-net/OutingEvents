import Event from "../entity/Event";
import connectORM from "./../connection";

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
export function addEvent(body: any) {
  const event = new Event();
  event.type = "Jokes";
  event.name = "April fools";
  event.location = "Planet earth";
  event.state = "planning";
  event.survey_id = 367;
  event.start_time = new Date(2019, 3, 1, 0, 0, 0, 0);
  event.end_time = new Date(2019, 3, 2, 0, 0, 0, 0);

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
export function deleteEventById(eventId: number) {
  // const event = new Event();
  return connectORM
    .getRepository(Event)
    .remove({ id: eventId })
    .then((result: any) => {
      return result;
    })
    .catch(err => {
      throw err;
    });
}
