import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne
} from "typeorm";
import Event from "./Event";
@Entity()
export default class SurveyResult extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  survey_id: number;

  @Column()
  useremail: string;

  @Column("json", { nullable: false })
  response: string;

  @ManyToOne(() => Event, (event: Event) => event.id)
  public event: Event;
}
