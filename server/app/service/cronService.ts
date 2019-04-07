import {
  getAllEventsByDeadlineDate,
  updateEventNameByEventId
} from "./eventService";

export async function CheckforEventDeadline() {
  let startDate = new Date(Date.now());
  let endDate = new Date(Date.now());
  endDate.setMinutes(endDate.getMinutes() + 360);
  let events = await getAllEventsByDeadlineDate();
  events.forEach(async (event: any) => {
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
