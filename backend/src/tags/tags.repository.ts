import { DataSource, Repository } from 'typeorm';
import { Tag } from '@entities/tag.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagRepository extends Repository<Tag> {
  constructor(private dataSource: DataSource) {
    super(Tag, dataSource.createEntityManager());
  }
}
