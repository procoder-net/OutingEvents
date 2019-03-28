import EventParticipant from "../entity/EventParticipant";
import connectORM from "./../connection";

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
    .find({ event_id: event_id })
    .then(eventParticipants => {
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
