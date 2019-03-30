import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import UserProfile from "./UserProfile";

@Entity()
export default class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  event_id: number;

  @ManyToOne(type => UserProfile, userProfile => userProfile.payments, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "user_id" })
  user: UserProfile;

  @Column()
  status: string;

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column()
  currency: string;
}
