import { DataSource, Repository } from 'typeorm';
import { Files } from '@entities/files.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesRepository extends Repository<Files> {
  constructor(private dataSource: DataSource) {
    super(Files, dataSource.createEntityManager());
  }
}
