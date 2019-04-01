import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
  OneToOne
} from "typeorm";
import EventParticipant from "./EventParticipant";
import SurveyResults from "./SurveyResult";
import SurveyQuestions from "./SurveyQuestion";

@Entity()
export default class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  state: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  description: string;

  @Column()
  survey_id: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  event_date: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  deadline_date: Date;

  @OneToMany(
    () => EventParticipant,
    (participant: EventParticipant) => participant.event
  )
  public invites: EventParticipant[];
}
