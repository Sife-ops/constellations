import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;
}
