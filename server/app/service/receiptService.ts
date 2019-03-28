import Receipt from "../entity/Receipt";
import connectORM from "./../connection";

/**
 *
 * @param event_id
 * @param body - {vendor: string, description: string, amount: number, currency: string}
 * @returns {Promise<(T&Entity)[]>}
 */
export function createReceipt(event_id: number, body: any) {
  const receipt = new Receipt();
  receipt.event_id = event_id;
  receipt.vendor = body.vendor;
  receipt.description = body.description;
  receipt.amount = body.amount;
  receipt.currency = body.currency;
  return connectORM.getRepository(Receipt).save(receipt);
}

export function deleteReceipt(id: number) {
  return connectORM
    .getRepository(Receipt)
    .delete(id)
    .then((result: any) => {
      return result;
    })
    .catch(err => {
      throw err;
    });
}

export function getReceiptsByEventId(event_id: number) {
  return connectORM
    .getRepository(Receipt)
    .find({ event_id: event_id })
    .then(receipts => {
      return receipts;
    })
    .catch(err => {
      throw err;
    });
}
