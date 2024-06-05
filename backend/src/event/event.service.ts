import { Injectable } from '@nestjs/common';
import { BaseService } from '@base/base.service';
import { Event } from '@entities/event.entity';
import { EventsDto } from './dto/events.dto';
import { EventRepository } from './event.repository';
import { EventDto } from './dto/event.dto';
import { plainToInstance } from 'class-transformer';
import { IsNull, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

@Injectable()
export class EventService extends BaseService<Event, EventRepository> {
  constructor(repository: EventRepository) {
    super(repository);
  }
  async getListEvents(): Promise<EventsDto[]> {
    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const events = await this.repository.find({
      relations: ['pois', 'pois.floor'],
      where: {
        endDate: MoreThanOrEqual(today),
        startDate: LessThanOrEqual(today),
      },
      order: {
        displayStartDate: 'ASC',
      },
    });

    return plainToInstance(EventsDto, events);
  }

  async getEventById(id: number): Promise<EventDto> {
    const event = await this.repository.findOne({
      where: { id },
      relations: ['pois', 'pois.floor'],
    });

    return plainToInstance(EventDto, event);
  }
}
