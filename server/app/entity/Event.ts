import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany
} from "typeorm";
import EventParticipant from "./EventParticipant";

@Entity()
export default class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  state: string;

  @Column()
  survey_id: number;

  @Column()
  start_time: String;

  @Column()
  end_time: String;

  @OneToMany(type => EventParticipant, participant => participant.event, {
    cascade: true
  })
  event_participants: EventParticipant[];
}
