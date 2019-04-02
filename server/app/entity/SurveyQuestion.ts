import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
  OneToMany
} from "typeorm";
import Event from "./Event";
import SurveyResult from "./SurveyResult";

@Entity()
export default class SurveyQuestion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => SurveyResult, result => result.survey_question)
  survey_results: SurveyResult[];

  @Column("json", { nullable: false })
  questions: string;

  @Column("json", { nullable: true })
  formattedquestion: string;
}
