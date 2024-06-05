import { Module } from '@nestjs/common';
import { FloorService } from './floors.service';
import { FloorsController } from './floors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FloorRepository } from './floors.repository';
import { Floor } from '@entities/floor.entity';

@Module({
  controllers: [FloorsController],
  providers: [FloorService, FloorRepository],
  imports: [TypeOrmModule.forFeature([Floor])],
})

export class FloorsModule {}