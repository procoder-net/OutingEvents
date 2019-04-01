import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import UserProfile from "./UserProfile";
import Event from "./Event";
import EventParticipant from "./EventParticipant";

@Entity()
export default class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Event, event => event.payments, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "event_id" })
  event: Event;

  @ManyToOne(type => EventParticipant, participant => participant.payments, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "event_participant_id" })
  event_participant: EventParticipant;

  @Column()
  status: string;

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column()
  currency: string;
}
