import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import Event from "./Event";

@Entity()
export default class EventParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  event_id: number;

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
