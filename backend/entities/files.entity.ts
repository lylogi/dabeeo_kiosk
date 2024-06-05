import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import FileConfig from '@config/files';
import { TYPE_FILE } from '@config/constant';
@Entity('files')
export class Files extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ name: 'seq_code', type: 'varchar', length: 50 })
  seqCode: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column({
    type: 'enum',
    enum: TYPE_FILE,
    default: TYPE_FILE.IMAGE,
  })
  type: TYPE_FILE;

  @Column({ default: true })
  status: boolean;

  public path: string;

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  async setPath() {
    this.path = FileConfig.imagesPath + this.name;
  }
}
