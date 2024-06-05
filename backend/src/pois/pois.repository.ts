import { DataSource, Repository } from 'typeorm';
import { Pois } from '@entities/pois.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PoisRepository extends Repository<Pois> {
  constructor(private dataSource: DataSource) {
    super(Pois, dataSource.createEntityManager());
  }
}
