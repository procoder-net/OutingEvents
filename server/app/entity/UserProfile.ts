import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Payment from "./Payment";

@Entity()
export default class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(type => Payment, payment => payment.user, { cascade: true })
  payments: Payment[];
}
