import { BaseEntity, Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { Pois } from './pois.entity';

@Entity('tags')
export class Tag extends BaseEntity {
  @PrimaryColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column('varchar', { length: 100 })
  content: string;

  @ManyToMany(() => Pois, (poi) => poi.tags)
  pois: Pois[];

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
