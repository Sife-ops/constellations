import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Car } from "./car";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Field(() => [Car])
  @OneToMany((type) => Car, (car) => car.user)
  cars: Car[];
}
