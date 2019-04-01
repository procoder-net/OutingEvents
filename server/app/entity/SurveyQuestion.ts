import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany
} from "typeorm";
import Event from "./Event";
@Entity()
export default class SurveyQuestion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("json", { nullable: false })
  questions: string;

  @Column("json", { nullable: true })
  formattedquestion: string;
}
