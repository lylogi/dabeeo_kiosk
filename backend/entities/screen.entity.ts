import { AfterLoad, BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { Files } from './files.entity';
import { TYPE_SCREEN } from '@config/constant';

@Entity('screens')
export class Screens extends BaseEntity {
  @PrimaryColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column('varchar', { length: 100, nullable: true })
  title: string;

  @Column({ name: 'seq_code', type: 'varchar', length: 50, nullable: true })
  seqCode: string;

  @Column({
    type: 'enum',
    enum: TYPE_SCREEN,
    default: TYPE_SCREEN.MAIN_SCREEN,
  })
  type: TYPE_SCREEN;

  @Column('int')
  duration: number;

  @Column('int')
  order: number;

  @Column({ name: 'start_date', type: 'datetime', default: () => 'NOW()' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'datetime', nullable: true })
  endDate: Date;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  public file: Files;

  @AfterLoad()
  async setPath() {
    const file: Files = await Files.findOne({
      where: { seqCode: this.seqCode },
    });
    this.file = file;
  }
}
