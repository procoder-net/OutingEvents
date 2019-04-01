import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import Event from "./Event";

@Entity()
export default class Receipt {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Event, event => event.receipt, {
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
