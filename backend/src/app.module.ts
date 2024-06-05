import { Module } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { ConfigModule } from '@nestjs/config';

import { PoisModule } from '@src/pois/pois.module';
import { MenuModule } from '@src/menu/menu.module';
import { LogModule } from '@src/log/log.module';
import { EventModule } from '@src/event/event.module';
import { TagsModule } from '@src/tags/tags.module';
import { ScreensModule } from '@src/screens/screens.module';
import { FloorsModule } from '@src/floors/floors.module';
import { SyncDataModule } from '@src/sync_data/sync_data.module';
import { FilesModule } from '@src/files/files.module';
import { dbConfig } from '@config/db-config';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CategoriesModule } from './categories/categories.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { ScheduleModule } from '@nestjs/schedule';

const toDay = new Date().toLocaleString('en-US', {
  timeZone: process.env.TIMEZONE || 'Asia/Ho_Chi_Minh',
});

const currentDate = toDay.slice(0, 8).split('/');
const currentDateFormat = currentDate
  ? currentDate[2] + '-' + currentDate[0] + '-' + currentDate[1]
  : new Date().toISOString().substring(0, 10);
const timezoned = () => {
  return new Date().toLocaleString('en-US', {
    timeZone: process.env.TIMEZONE || 'Asia/Ho_Chi_Minh',
  });
};
@Module({
  imports: [
    PoisModule,
    MenuModule,
    LogModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    EventModule,
    TagsModule,
    ScreensModule,
    FloorsModule,
    SyncDataModule,
    FilesModule,
    TypeOrmCoreModule.forRoot(dbConfig),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      exclude: ['/api/(.*)'],
    }),
    CategoriesModule,
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp({ format: timezoned }),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          dirname: './public/logs',
          filename: `${currentDateFormat}.log`,
          // maxFiles: 60,
        }),
      ],
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
