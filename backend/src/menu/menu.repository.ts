import { DataSource, Repository } from 'typeorm';
import { Menu } from '@entities/menu.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MenuRepository extends Repository<Menu> {
  constructor(private dataSource: DataSource) {
    super(Menu, dataSource.createEntityManager());
  }
}
