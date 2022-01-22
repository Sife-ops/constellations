import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { User } from "./user";

@ObjectType()
@Entity()
export class Car extends BaseEntity {
  @Field(() => ID, { nullable: true })
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  year: number;

  @Field(() => String)
  @Column()
  plate: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.cars)
  @TypeormLoader()
  user: User;
}
