import { Log } from '@entities/logs.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
@Injectable()
export class LogRepository extends Repository<Log> {
  constructor(private dataSource: DataSource) {
    super(Log, dataSource.createEntityManager());
  }
}
