import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  OneToOne,
  JoinColumn
} from "typeorm";
import EventParticipant from "./EventParticipant";
import Payment from "./Payment";
import Receipt from "./Receipt";
import SurveyQuestion from "./SurveyQuestion";
import SurveyResult from "./SurveyResult";

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
  start_time: String;

  @Column()
  end_time: String;

  @OneToOne(type => Receipt, receipt => receipt.event, {
    cascade: true
  })
  @JoinColumn({ name: "receipt_id" })
  receipt: Receipt;

  @OneToOne(type => SurveyQuestion, survey_question => survey_question.event, {
    cascade: true
  })
  @JoinColumn({ name: "survey_id" })
  survey_question: SurveyQuestion;

  @OneToMany(type => Payment, payment => payment.event, {
    cascade: true
  })
  payments: Payment[];

  @OneToMany(
    type => EventParticipant,
    event_participant => event_participant.event,
    {
      cascade: true,
      nullable: true
    }
  )
  event_participants: EventParticipant[];

  @OneToMany(type => SurveyResult, survey_result => survey_result.event, {
    cascade: true
  })
  survey_result: SurveyResult[];
}
