import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import EventParticipant from "./EventParticipant";
import Event from "./Event";

@Entity()
export default class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => EventParticipant, participant => participant.payments, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "event_participant_id" })
  event_participant: EventParticipant;

  @ManyToOne(type => EventParticipant, participant => participant.payments, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "event_id" })
  event: Event;

  @Column()
  status: string;

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column()
  currency: string;
}
