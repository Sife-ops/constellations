import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Car } from "./car";
import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";

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
  @TypeormLoader()
  cars: Car[];
}
