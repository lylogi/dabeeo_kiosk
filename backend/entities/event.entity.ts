import {
  AfterLoad,
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';
import { Files } from './files.entity';
import { Pois } from './pois.entity';
import { TYPE_EVENT } from '@config/constant';

@Entity('event')
export class Event extends BaseEntity {
  @PrimaryColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column('json')
  title: {
    key: string;
    value: string;
  };

  @Column('json', { name: 'seq_code', nullable: true })
  seqCode: {
    key: string;
    value: string;
  };

  @Column('json')
  content: {
    key: string;
    value: string;
  };

  @Column({
    type: 'enum',
    enum: TYPE_EVENT,
    default: TYPE_EVENT.COUPON,
  })
  type: TYPE_EVENT;

  @Column({
    name: 'start_date',
    type: 'datetime',
    default: () => 'NOW()',
  })
  startDate: Date;

  @Column({
    name: 'end_date',
    type: 'datetime',
    default: () => 'NOW()',
  })
  endDate: Date;

  @Column({
    name: 'display_start_date',
    type: 'datetime',
    default: () => 'NOW()',
  })
  displayStartDate: Date;

  @Column({
    name: 'display_end_date',
    type: 'datetime',
    default: () => 'NOW()',
  })
  displayEndDate: Date;

  @Column({ name: 'full_screen', default: false })
  fullScreen: boolean;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToMany(() => Pois, (pois) => pois.events, { cascade: true })
  @JoinTable({
    name: 'event_poi',
    joinColumn: {
      name: 'event_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'poi_id',
      referencedColumnName: 'id',
    },
  })
  pois: Pois[];

  public files: Files[];

  @AfterLoad()
  async setPath() {
    const files: Files[] = await Files.find({
      where: { seqCode: this.seqCode ? this.seqCode['vi'] : '' },
    });
    this.files = files;
  }
}
