import { Injectable, NotFoundException } from '@nestjs/common';
import { PoisRepository } from './pois.repository';
import { BaseService } from 'src/base/base.service';
import { Pois } from 'entities/pois.entity';
import { PoiDto } from './dto/poi.dto';
import { MenuService } from '@src/menu/menu.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PoisService extends BaseService<Pois, PoisRepository> {
  constructor(
    repository: PoisRepository,
    private readonly menuService: MenuService,
  ) {
    super(repository);
  }

  async getAll(query: any) {
    const { menu_id, lang, categories_id, branchId } = query;

    if (menu_id) {
      return await this.getListByMenu(menu_id, lang, branchId);
    }
    const categoriesId = categories_id;
    return this.repository
      .createQueryBuilder('pois')
      .leftJoinAndSelect('pois.tags', 'tags')
      .leftJoinAndSelect('pois.floor', 'floor')
      .leftJoinAndSelect('pois.category', 'category')
      .leftJoin('category.menus', 'menus')
      .where(
        'category.parentCode IN (:...categoriesId) OR IsNull(category.mapCatId) OR IsNull(category.parentCode)',
        {
          categoriesId,
        },
      )
      .andWhere('pois.branchId = :branchId', { branchId })
      .addOrderBy('floor.order', 'DESC')
      .addOrderBy(`LOWER(JSON_EXTRACT(pois.title, '$.${lang}'))`, 'ASC')
      .getMany();
  }

  async getDetail(id: any) {
    const entity = await this.repository.findOne({
      where: { id: id },
      relations: ['tags'],
    });
    if (!entity) {
      throw new NotFoundException(
        'Poi id ' + id + ' does not exists in the system',
      );
    }

    return plainToClass(PoiDto, entity);
  }

  async getDetailByIdMap(map_poi_id: string) {
    const entity = await this.repository.findOne({
      where: { mapPoiId: map_poi_id },
      relations: ['floor', 'category'],
    });
    if (!entity) {
      throw new NotFoundException(
        'Poi with map poid id ' + map_poi_id + ' does not exists in the system',
      );
    }
    return plainToClass(PoiDto, entity);
  }

  async getListByMenu(menuId: any, lang: string, branchId: string) {
    return await this.repository
      .createQueryBuilder('pois')
      .leftJoinAndSelect('pois.tags', 'tags')
      .leftJoinAndSelect('pois.floor', 'floor')
      .leftJoinAndSelect('pois.category', 'category')
      .leftJoinAndSelect('category.menus', 'menus')
      .where('menus.id = :menuId', { menuId })
      .andWhere('pois.branchId = :branchId', { branchId })
      .addOrderBy('floor.order', 'DESC')
      .addOrderBy(`LOWER(JSON_EXTRACT(pois.title, '$.${lang}'))`, 'ASC')
      .getMany();
  }
}
