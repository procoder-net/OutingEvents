import EventParticipant from "../entity/EventParticipant";
import connectORM from "./../connection";
import Event from "../entity/Event";
import { getEventByEventId } from "./eventService";

export async function addEventParticipant(
  useremail: string,
  event: any,
  isOrganizer: boolean,
  confirmed: boolean,
  attended: boolean
) {
  const eventParticipant = new EventParticipant();
  eventParticipant.useremail = useremail;
  eventParticipant.event =
    event instanceof Event ? event : await getEventByEventId(event);
  eventParticipant.is_organizer = isOrganizer;
  //when participant is created, all of these are false
  eventParticipant.attended = confirmed;
  eventParticipant.confirmed = attended;
  return connectORM.getRepository(EventParticipant).save(eventParticipant);
}

export function removeEventParticipant(participant_id: number) {
  return connectORM
    .getRepository(EventParticipant)
    .delete(participant_id)
    .then((result: any) => {
      return result;
    })
    .catch(err => {
      throw err;
    });
}

export function getEventParticipants(event_id: number) {
  return connectORM
    .getRepository(EventParticipant)
    .find({ eventId: event_id })
    .then(eventParticipants => {
      console.log(eventParticipants);
      return eventParticipants;
    })
    .catch(err => {
      throw err;
    });
}

export function updateEventParticipantStatus(
  participant_id: number,
  updatedData: any
) {
  return connectORM
    .getRepository(EventParticipant)
    .findOne({ id: participant_id })
    .then((eventParticipant: any) => {
      eventParticipant.notified = updatedData.notified
        ? updatedData.notified
        : eventParticipant.notified;
      eventParticipant.confirmed = updatedData.confirmed
        ? updatedData.confirmed
        : eventParticipant.confirmed;
      eventParticipant.attended = updatedData.attended
        ? updatedData.attended
        : eventParticipant.attended;
      eventParticipant.tooksurvey = updatedData.tooksurvey
        ? updatedData.tooksurvey
        : eventParticipant.tooksurvey;
      return connectORM.getRepository(EventParticipant).save(eventParticipant);
    })
    .catch(err => {
      throw err;
    });
}
