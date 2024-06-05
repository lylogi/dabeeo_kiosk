import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity('menus')
export class Menu extends BaseEntity {
  @PrimaryColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column('json')
  title: {
    key: string;
    value: string;
  };

  @Column('varchar', { length: 10 })
  type: string;

  @ManyToMany(() => Category, (categories) => categories.menus, {
    cascade: true,
  })
  @JoinTable({
    name: 'menu_categories',
    joinColumn: {
      name: 'menu_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  categories: Category[];

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('int')
  order: number;
}
