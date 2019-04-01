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
import UserProfile from "./UserProfile";
import EventParticipant from "./EventParticipant";

@Entity()
export default class SurveyResult extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => SurveyQuestion, question => question.survey_results, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "survey_question_id" })
  survey_question: SurveyQuestion;

  @ManyToOne(
    type => EventParticipant,
    participant => participant.survey_results,
    {
      onDelete: "CASCADE"
    }
  )
  @JoinColumn({ name: "participant_id" })
  event_participant: EventParticipant;

  @ManyToOne(type => Event, event => event.survey_result, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "event_id" })
  event: Event;

  @Column("json", { nullable: false })
  response: string;
}
