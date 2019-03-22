import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Receipt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  event_id: number;

  @Column()
  vendor: string;

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column()
  currency: string;
}
