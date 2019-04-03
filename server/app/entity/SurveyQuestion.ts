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

  @Column("json", { nullable: false })
  questions: string;

  @Column("json", { nullable: true })
  formattedquestion: string;
}
