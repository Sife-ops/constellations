import { Bookmark } from './bookmark';
import { User } from './user';

import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @ManyToMany(() => Bookmark, (bookmark) => bookmark.categories)
  bookmarks: Bookmark[];

  @ManyToOne(() => User, (user) => user.categories, { onDelete: 'CASCADE' })
  user: User;
}
