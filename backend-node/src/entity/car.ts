import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class Car extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  year: number;

  @Column()
  plate: string;

  @ManyToOne(() => User, (user) => user.cars)
  user: User;
}
