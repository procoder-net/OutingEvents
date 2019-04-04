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
  user: string;

  @Column({ nullable: false })
  questions: string;

  @Column({ nullable: true })
  formattedquestion: string;
}
