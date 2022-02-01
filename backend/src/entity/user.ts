import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Bookmark } from "./bookmark";
import { Category } from "./category";

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

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  bookmarks: Bookmark[];

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];
}
