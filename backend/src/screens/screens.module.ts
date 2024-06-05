import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreenService } from './screens.service';
import { ScreensController } from './screens.controller';
import { ScreenRepository } from './screens.repository';
import { Screens } from 'entities/screen.entity';

@Module({
  controllers: [ScreensController],
  providers: [ScreenService, ScreenRepository],
  imports: [TypeOrmModule.forFeature([Screens])],
})
export class ScreensModule {}
