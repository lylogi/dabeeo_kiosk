import { Injectable } from '@nestjs/common';
import { ScreenDto } from './dto/screen.dto';
import { BaseService } from 'src/base/base.service';
import { ScreenRepository } from './screens.repository';
import { Screens } from 'entities/screen.entity';
import { plainToInstance } from 'class-transformer';
import { IsNull, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

@Injectable()
export class ScreenService extends BaseService<Screens, ScreenRepository> {
  constructor(repository: ScreenRepository) {
    super(repository);
  }

  async getListScreen(query?: object) {
    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const screens = await this.repository.find({
      where: [
        {
          type: query['type'],
          endDate: MoreThanOrEqual(startOfToday),
          startDate: LessThanOrEqual(startOfToday),
        },
        {
          type: query['type'],
          startDate: LessThanOrEqual(startOfToday),
          endDate: IsNull(),
        },
      ],
      order: {
        order: 'ASC',
        createdAt: 'ASC',
      },
    });
    return plainToInstance(ScreenDto, screens);
  }
}
