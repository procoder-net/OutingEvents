import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class User {
  @PrimaryGeneratedColumn("userid")
  id: number;

  @Column("name")
  first_name: string;

  @Column("lastname")
  last_name: string;

  @Column("email")
  email: string;

  @Column("username")
  username: string;

  @Column("password")
  password: string;
}
