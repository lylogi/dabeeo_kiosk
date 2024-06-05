import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventsController } from './event.controller';
import { EventRepository } from './event.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '@entities/event.entity';

@Module({
  controllers: [EventsController],
  providers: [EventService, EventRepository],
  imports: [TypeOrmModule.forFeature([Event])],
})
export class EventModule {}
