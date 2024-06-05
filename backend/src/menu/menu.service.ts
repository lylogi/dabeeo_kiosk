import { Injectable } from '@nestjs/common';
import { MenuRepository } from './menu.repository';
import { BaseService } from 'src/base/base.service';
import { Menu } from 'entities/menu.entity';
import { plainToClass } from 'class-transformer';
import { MenuDto } from './dto/menu.dto';
import { MenuDtoDetail } from './dto/menu-detail.dto';

@Injectable()
export class MenuService extends BaseService<Menu, MenuRepository> {
  constructor(repository: MenuRepository) {
    super(repository);
  }

  async getAll() {
    return await this.repository.find({
      relations: ['categories'],
      order: {
        order: 'ASC',
      },
    });
  }

  async getDetail(id: any) {
    return plainToClass(
      MenuDto,
      await this.repository.findOne({
        where: { id: id },
      }),
    );
  }

  async getDetailWithPois(id: any) {
    return plainToClass(
      MenuDtoDetail,
      await this.repository.findOne({
        where: { id: id },
        relations: ['categories.pois.tags'],
      }),
    );
  }
}
