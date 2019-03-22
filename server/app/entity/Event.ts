import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne
} from "typeorm";
import SurveyQuestion from "./SurveyQuestion";

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
  survey_id: number;

  @Column()
  start_time: Date;

  @Column()
  end_time: Date;
}
