import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import Event from "./Event";
import SurveyQuestion from "./SurveyQuestion";
import EventParticipant from "./EventParticipant";

@Entity()
export default class SurveyResult extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  survey_question: number;

  @OneToOne(
    type => EventParticipant,
    participant => participant.survey_result,
    {
      onDelete: "CASCADE"
    }
  )
  @JoinColumn({ name: "participant" })
  event_participant: EventParticipant;

  @ManyToOne(type => Event, event => event.survey_results, {
    onDelete: "CASCADE"
  })
  event: Event;

  @Column()
  user: string;

  @Column({ nullable: false })
  response: string;
}
