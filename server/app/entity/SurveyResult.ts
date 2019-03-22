import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export default class SurveyResult extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  survey_question_id: number;

  @Column()
  user_id: string;

  @Column()
  event_id: number;

  @Column()
  response: any;
}
