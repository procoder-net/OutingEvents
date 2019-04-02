import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import Event from "./Event";

@Entity()
export default class Receipt {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Event, event => event.receipts, {
    onDelete: "CASCADE"
  })
  event: Event;

  @Column()
  vendor: string;

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column()
  currency: string;
}
