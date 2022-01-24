import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Car } from "./car";

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Car, (car) => car.user)
  cars: Car[];
}
