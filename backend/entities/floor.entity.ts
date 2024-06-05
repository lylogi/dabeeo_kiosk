import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Pois } from './pois.entity';

@Entity('floors')
export class Floor extends BaseEntity {
  @PrimaryColumn({ name: 'id', type: 'bigint' })
  id: string;

  @Column({ name: 'map_floor_id', type: 'varchar', length: 100 })
  mapFloorId: string;

  @Column({ name: 'branch_id', type: 'bigint' })
  branchId: string;

  @Column('varchar', { length: 100 })
  title: string;

  @Column('json', { nullable: true })
  subject: {
    key: string;
    value: string;
  };

  @Column({ type: 'int' })
  order: number;

  @OneToMany(() => Pois, (pois) => pois.floor, {
    onDelete: 'CASCADE',
  })
  pois: Pois[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
