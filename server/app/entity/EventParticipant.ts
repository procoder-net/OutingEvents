import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import Event from "./Event";
import { type } from "os";

@Entity()
export default class EventParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Event, event => event.event_participants, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "event_id" })
  event: Event;

  @Column()
  user_id: number;

  @Column()
  is_organizer: boolean;

  @Column()
  notified: boolean;

  @Column()
  confirmed: boolean;

  @Column()
  attended: boolean;

  @Column()
  tooksurvey: boolean;
}
