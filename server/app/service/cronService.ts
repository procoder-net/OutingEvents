import {
  getAllEventsByDeadlineDate,
  updateEventNameByEventId,
  getEventByEventId
} from "./eventService";
import { createSurveyResult } from "./surveyQuestionService";
import {
  getEventParticipantsByUser,
  getEventParticipants
} from "./eventParticipantService";

const result = {
  question1: ["item1", "item2", "item3"],
  question6: ["item1", "item2", "item3"],
  question4: ["item3"],
  question2: ["item2"],
  question5: ["item1"]
};

const answers = () => {
  let arr = Array(Math.floor(Math.random() * 4 + 1));
  return arr.fill(4).map((_, i) => "item" + (i + 1));
};

const generateResults = () => {
  let results: any = {};
  Array(5)
    .fill(5)
    .map((_, i) => {
      results["question" + (i + 1)] = answers();
    });
  return results;
};

export async function CheckforEventDeadline() {
  let startDate = new Date(Date.now());
  let endDate = new Date(Date.now());
  endDate.setMinutes(endDate.getMinutes() + 360);
  let events = await getAllEventsByDeadlineDate();

  events.forEach(async (event: any) => {
    let participants = await getEventParticipants(event.id, null, false);
    participants.map(async (part: any) => {
      let res = generateResults();
      await createSurveyResult(
        event.id,
        1,
        part.user,
        part.id,
        JSON.stringify(res)
      );
    });
    if (event.deadline_date > startDate && event.deadline_date <= endDate) {
      await updateEventNameByEventId(event.id, {
        state: "Active"
      });
    }
  });
  return;
  /*let deadlineReachedEvent = events.each((event: any) => {
    if (startDate > event.deadline_date && endDate <= event.deadline_date) {
    console.log(event.deadline_date);
    }
    });*/
  //console.log(deadlineReachedEvent);
}
