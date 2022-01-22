import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user";

@ObjectType()
@Entity()
export class Car extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  year: number;

  @Field(() => String)
  @Column()
  plate: string;

  @Field(() => User)
  @ManyToOne((type) => User, (user) => user.cars)
  user: User;
}
