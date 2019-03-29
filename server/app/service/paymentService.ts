import Payment from "../entity/Payment";
import connectORM from "./../connection";
import UserProfile from "../entity/UserProfile";

export async function createPayment(
  event_id: number,
  user_id: number,
  payment_status: string,
  payment_details: any
) {
  const payment = new Payment();
  payment.event_id = event_id;
  payment.status = payment_status || "pending";
  payment.amount = payment_details.amount || 0;
  payment.currency = payment_details.currency || "USD";
  payment.description = payment_details.description || "";
  const user: any = await connectORM
    .getRepository(UserProfile)
    .findOne(1, { relations: ["payments"] });
  user.payments.push(payment);
  await connectORM.getRepository(UserProfile).save(user);
  return payment;
}

export function getPaymentInformationByEventId(event_id: number) {
  return connectORM
    .getRepository(Payment)
    .find({ event_id: event_id, relations: ["user"] })
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
