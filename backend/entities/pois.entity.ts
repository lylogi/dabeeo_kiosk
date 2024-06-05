import {
  AfterLoad,
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Tag } from './tag.entity';
import { Category } from './category.entity';
import { Files } from './files.entity';
import { Floor } from './floor.entity';
import { Event } from './event.entity';
@Entity('pois')
export class Pois extends BaseEntity {
  @PrimaryColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'map_poi_id', type: 'varchar', length: 100 })
  mapPoiId: string;

  @Column('json')
  title: {
    key: string;
    value: string;
  };

  @Column({ name: 'desc', type: 'json', nullable: true })
  desc: {
    key: string;
    value: string;
  };

  @Column({ name: 'seq_code', type: 'json', nullable: true })
  seqCode: {
    key: string;
    value: string;
  };

  @Column({ name: 'branch_id', type: 'bigint' })
  branchId: number;

  @ManyToOne(() => Floor, (floor) => floor.pois, {
    cascade: true,
  })
  @JoinColumn({ name: 'floor_id' })
  floor: Floor;

  @Column({ name: 'coordinate_x', type: 'double' })
  coordinateX: number;

  @Column({ name: 'coordinate_y', type: 'double' })
  coordinateY: number;

  @ManyToOne(() => Category, (category) => category.pois, {
    cascade: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column('json', { nullable: true })
  phone: {
    key: string;
    value: string;
  };

  @ManyToMany(() => Tag, (tags) => tags.pois, { cascade: true })
  @JoinTable({
    name: 'poi_tags',
    joinColumn: {
      name: 'poi_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags: Tag[];

  @ManyToMany(() => Event, (event) => event.pois)
  events: Event[];

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  public files: Files[];

  @AfterLoad()
  async setPath() {
    const files: Files[] = await Files.find({
      where: { seqCode: this.seqCode ? this.seqCode['vi'] : '' },
    });
    this.files = files;
  }
}
