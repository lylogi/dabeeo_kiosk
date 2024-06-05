import { DataSource, Repository } from 'typeorm';
import { Event } from '@entities/event.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventRepository extends Repository<Event> {
  constructor(private dataSource: DataSource) {
    super(Event, dataSource.createEntityManager());
  }
}
