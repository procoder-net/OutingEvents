import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export default class SurveyResult extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  survey_question_id: number;

  @Column()
  user_id: number;

  @Column()
  event_id: number;

  @Column("json", { nullable: false })
  response: string;
}
