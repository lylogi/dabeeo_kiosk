import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Menu } from './menu.entity';
import { Pois } from './pois.entity';

@Entity('categories')
export class Category extends BaseEntity {
  @PrimaryColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'map_cat_id', type: 'varchar', length: 100 })
  mapCatId: string;

  @Column({ name: 'branch_id', type: 'bigint' })
  branchId: number;

  @Column('json')
  title: {
    key: string;
    value: string;
  };

  @ManyToMany(() => Menu, (menu) => menu.categories, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  menus: Menu[];

  @OneToMany(() => Pois, (pois) => pois.category, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  pois: Pois[];

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ name: 'parent_code', type: 'varchar', length: 100, nullable: true })
  parentCode: string;

  @Column({ name: 'sort_order', type: 'varchar', length: 2 })
  sortOrder: number;

  @Column({ name: 'children_count', type: 'int' })
  childrenCount: number;
}
