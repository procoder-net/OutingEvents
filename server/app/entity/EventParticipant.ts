import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import Event from "./Event";
import SurveyResult from "./SurveyResult";
import Payment from "./Payment";

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
  useremail: string;

  @Column()
  is_organizer: boolean;

  @Column({
    default: false
  })
  confirmed: boolean;

  @Column({
    default: false
  })
  attended: boolean;

  @OneToMany(
    type => SurveyResult,
    surveyResult => surveyResult.event_participant,
    { cascade: true }
  )
  survey_results: SurveyResult[];

  @OneToMany(type => Payment, payment => payment.event_participant, {
    cascade: true
  })
  payments: Payment[];
}
