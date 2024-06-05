import { DataSource, Repository } from 'typeorm';
import { Screens } from '@entities/screen.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ScreenRepository extends Repository<Screens> {
  constructor(private dataSource: DataSource) {
    super(Screens, dataSource.createEntityManager());
  }
}
