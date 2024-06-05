import { DataSource, Repository } from 'typeorm';
import { Floor } from '@entities/floor.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FloorRepository extends Repository<Floor> {
  constructor(private dataSource: DataSource) {
    super(Floor, dataSource.createEntityManager());
  }
}
