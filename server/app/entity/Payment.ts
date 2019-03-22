import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("eventid")
  event_id: number;

  @Column("userid")
  user_id: number;

  @Column("status")
  status: string;

  @Column("description")
  description: string;

  @Column("amount")
  amount: number;

  @Column("currency")
  currency: string;
}
