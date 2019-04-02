import EventParticipant from "../entity/EventParticipant";
import Event from "../entity/Event";

import connectORM from "./../connection";

export async function addEventParticipant(
  useremail: string,
  event_id: number,
  isOrganizer: boolean,
  confirmed: boolean,
  attended: boolean
) {
  const eventParticipant = new EventParticipant();
  //eventParticipant.user_id = user_id;
  eventParticipant.is_organizer = isOrganizer;
  //when participant is created, all of these are false
  eventParticipant.attended = attended;
  eventParticipant.confirmed = confirmed;
  eventParticipant.useremail = useremail;

  const event: any = await connectORM
    .getRepository(Event)
    .findOne({ id: event_id, relations: ["event_participants"] });

  if (event) {
    event.event_participants.push(eventParticipant);
    await connectORM.getRepository(Event).save(event);
    return eventParticipant;
  }
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
    .find({
      event_id: event_id,
      relations: ["event", "survey_results", "payments"]
    })
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
