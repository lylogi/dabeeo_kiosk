import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { Category } from '@entities/category.entity';
import { Event } from '@entities/event.entity';
import { Files } from '@entities/files.entity';
import { Floor } from '@entities/floor.entity';
import { Menu } from '@entities/menu.entity';
import { Pois } from '@entities/pois.entity';
import { Tag } from '@entities/tag.entity';
import { Screens } from '@entities/screen.entity';
import { Log } from '@entities/logs.entity';

import * as dotenv from 'dotenv';
dotenv.config();

export const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Category, Event, Files, Floor, Menu, Pois, Screens, Tag, Log],
  synchronize: false,
  logging: false,
  timezone: 'Z',
  connectTimeout: +process.env.DB_CONNECTION_TIMEOUT,
};
