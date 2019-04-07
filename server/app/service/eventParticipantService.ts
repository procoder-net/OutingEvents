import EventParticipant from "../entity/EventParticipant";
import Event from "../entity/Event";

import connectORM from "./../connection";
import { getEventByEventId } from "./eventService";
const populate = ["event", "survey_result", "payments"];
export async function addEventParticipant(
  user: string,
  event_id: any,
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
  eventParticipant.user = user;
  eventParticipant.event =
    event_id instanceof Event ? event_id : await getEventByEventId(event_id);
  return await connectORM
    .getRepository(EventParticipant)
    .save(eventParticipant);
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

export function getEventParticipants(
  event_id: number,
  id?: number,
  populateRelations = true
): any {
  let find: any = {
    where: {
      event: event_id
    }
  };
  if (id) {
    find.where.id = id;
  }
  if (populateRelations) {
    find.relations = populate;
  }
  return connectORM
    .getRepository(EventParticipant)
    .find(find)
    .then(eventParticipants => {
      return eventParticipants;
    })
    .catch(err => {
      throw err;
    });
}

export function getEventParticipantsByUser(
  user: string,
  event_id?: any,
  populateRelations = true
): any {
  let find: any = {
    where: {
      user: user
    }
  };
  if (event_id) {
    find.where.event = event_id;
  }
  if (populateRelations) {
    find.relations = populate;
  }
  return connectORM
    .getRepository(EventParticipant)
    .find(find)
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

// tested get and add
// need to test update and delete
