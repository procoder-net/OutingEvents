import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Event from "./Event";

@Entity()
export default class EventParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event: Event) => event.id)
  public event: Event;

  @Column()
  useremail: string;

  @Column()
  is_organizer: boolean;

  @Column({
    default: false
  })
  confirmed: boolean;

  @Column({
    default: false
  })
  attended: boolean;
}
