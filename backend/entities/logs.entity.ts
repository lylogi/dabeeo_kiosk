import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('logs')
export class Log extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column('tinyint')
  type: number;

  @Column('json')
  data: string;

  @Column({
    transformer: {
      to (value) {
        return new Date();
      },
      from(value) {
        return value;
      },
    },
  })
  inserted_at: Date;

  @Column({
    type: 'boolean',
    default: 0,
  })
  status: boolean;
}
