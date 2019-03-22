import { Column, Entity } from "typeorm";
import Event from "./Event";

@Entity()
export default class EventParticipant {
  @Column("event_id")
  event_id: number;

  @Column("userid")
  user_id: number;

  @Column("isorganizer")
  is_organizer: boolean;

  @Column("notified")
  notified: boolean;

  @Column("confirmed")
  confirmed: boolean;

  @Column("attended")
  attended: boolean;

  @Column("tooksurvey")
  tooksurvey: boolean;
}
