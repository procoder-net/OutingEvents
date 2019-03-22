import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Receipt {
  @PrimaryGeneratedColumn("receiptid")
  id: number;

  @Column("eventid")
  event_id: number;

  @Column("vendor")
  vendor: string;

  @Column("description")
  description: string;

  @Column("amount")
  amount: number;

  @Column("currency")
  currency: string;
}
