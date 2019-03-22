import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  event_id: number;

  @Column()
  user_id: number;

  @Column()
  status: string;

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column()
  currency: string;
}
