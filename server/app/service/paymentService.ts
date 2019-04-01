import Payment from "../entity/Payment";
import connectORM from "./../connection";
import UserProfile from "../entity/UserProfile";
import Event from "../entity/Event";
import EventParticipant from "../entity/EventParticipant";

export async function createPayment(
  event_id: number,
  event_participant_id: number,
  payment_status: string,
  payment_details: any
) {
  const payment = new Payment();
  payment.status = payment_status || "pending";
  payment.amount = payment_details.amount || 0;
  payment.currency = payment_details.currency || "USD";
  payment.description = payment_details.description || "";
  const eventParticipant: any = await connectORM
    .getRepository(EventParticipant)
    .findOne(event_participant_id, { relations: ["payments"] });
  if (eventParticipant) {
    eventParticipant.payments.push(payment);
    await connectORM.getRepository(EventParticipant).save(eventParticipant);
  }
  return payment;
}

export function getPaymentInformationByEventId(event_id: number) {
  return connectORM
    .getRepository(Payment)
    .find({ event_id: event_id, relations: ["event_participant"] })
    .then(payments => {
      return payments;
    })
    .catch(err => {
      throw err;
    });
}

export function updatePaymentStatus(filter: any, newStatus: string) {
  return connectORM
    .getRepository(Payment)
    .findOne(filter)
    .then((payment: any) => {
      if (payment != undefined) {
        payment.status = newStatus;
        return connectORM.getRepository(Payment).save(payment);
      }
      return payment;
    })
    .catch(err => {
      throw err;
    });
}
