import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne
} from "typeorm";
import EventParticipant from "./EventParticipant";
import Receipt from "./Receipt";
import SurveyQuestion from "./SurveyQuestion";
import SurveyResult from "./SurveyResult";
import Payment from "./Payment";

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

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  event_date: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  deadline_date: Date;

  @OneToOne(type => Receipt, receipt => receipt.event, {
    cascade: true
  })
  @JoinColumn({ name: "receipt_id" })
  receipt: Receipt;

  survey_id: number;

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

  @OneToMany(type => Payment, payment => payment.event, {
    cascade: true
  })
  payments: Payment[];

  @OneToMany(type => Receipt, receipt => receipt.event, {
    cascade: true
  })
  receipts: Receipt[];
}
