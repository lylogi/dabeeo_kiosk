import { Injectable } from '@nestjs/common';
import { FloorDto } from './dto/floor.dto';
import { BaseService } from 'src/base/base.service';
import { FloorRepository } from './floors.repository';
import { Floor } from 'entities/floor.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FloorService extends BaseService<Floor, FloorRepository> {
  constructor(repository: FloorRepository) {
    super(repository);
  }

  async getAll() {
    return await this.repository.find({
      order: {
        order: 'ASC',
      },
    });
  }
  async getDetail(id: string) {
    const floor = await this.findOne(id);
    return plainToInstance(FloorDto, floor);
  }
}
