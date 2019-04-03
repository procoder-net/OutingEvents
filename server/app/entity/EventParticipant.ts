import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne
} from "typeorm";
import Event from "./Event";
import SurveyResult from "./SurveyResult";
import Payment from "./Payment";

@Entity()
export default class EventParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Event, event => event.id, {
    nullable: true
  })
  event: Event;

  @Column()
  user: string;

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

  @OneToOne(
    type => SurveyResult,
    surveyResult => surveyResult.event_participant,
    { cascade: true }
  )
  survey_result: SurveyResult;

  @OneToOne(type => Payment, payment => payment.event_participant, {
    cascade: true
  })
  payments: Payment;
}
