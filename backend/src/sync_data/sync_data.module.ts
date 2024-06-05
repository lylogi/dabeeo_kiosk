import { Module, forwardRef } from '@nestjs/common';
import { SyncDataService } from './sync_data.service';
import { SyncDataController } from './sync_data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from '@entities/tag.entity';
import { CategoryRepository } from '@src/menu/category.repository';
import { MenuRepository } from '@src/menu/menu.repository';
import { TagRepository } from '@src/tags/tags.repository';
import { PoisRepository } from '@src/pois/pois.repository';
import { Pois } from '@entities/pois.entity';
import { Category } from '@entities/category.entity';
import { Menu } from '@entities/menu.entity';
import { EventRepository } from '@src/event/event.repository';
import { Floor } from '@entities/floor.entity';
import { Screens } from '@entities/screen.entity';
import { FloorRepository } from '@src/floors/floors.repository';
import { EventModule } from '@src/event/event.module';
import { Event } from '@entities/event.entity';
import { HttpModule } from '@nestjs/axios';
import { FilesRepository } from '@src/files/files.repository';
import { Files } from '@entities/files.entity';
import { SftpService } from '@config/sftp';
import { LogService } from '@src/log/log.service';
import { LogRepository } from '@src/log/log.repository';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SyncInterceptor } from '../../interceptors/sync.interceptor';

@Module({
  controllers: [SyncDataController],
  providers: [
    SyncDataService,
    TagRepository,
    CategoryRepository,
    MenuRepository,
    PoisRepository,
    MenuRepository,
    PoisRepository,
    EventRepository,
    FloorRepository,
    FilesRepository,
    LogRepository,
    SftpService,
    LogService,
    {
      provide: APP_INTERCEPTOR,
      useClass: SyncInterceptor,
    },
  ],
  imports: [
    TypeOrmModule.forFeature([Tag]),
    TypeOrmModule.forFeature([Pois]),
    TypeOrmModule.forFeature([Category]),
    TypeOrmModule.forFeature([Menu]),
    TypeOrmModule.forFeature([Event]),
    TypeOrmModule.forFeature([Floor]),
    TypeOrmModule.forFeature([Screens]),
    TypeOrmModule.forFeature([Floor]),
    TypeOrmModule.forFeature([Files]),
    forwardRef(() => EventModule),
    forwardRef(() => HttpModule),
  ],
})
export class SyncDataModule {}
