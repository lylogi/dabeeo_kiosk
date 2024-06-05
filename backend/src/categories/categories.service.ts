import { Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { CategoriesRepository } from './categories.repository';
import { plainToInstance } from 'class-transformer';
import { BaseService } from '@base/base.service';
import { Category } from '@entities/category.entity';

@Injectable()
export class CategoriesService extends BaseService<
  Category,
  CategoriesRepository
> {
  constructor(repository: CategoriesRepository) {
    super(repository);
  }

  async getAll(query: any) {
    const { menu_id, lang, categories_id } = query;
    let categories = [];

    if (menu_id && menu_id < 0) {
      return categories;
    }

    const categoriesId = categories_id;
    if (!menu_id) {
      categories = await this.repository
        .createQueryBuilder('category')
        .where(
          'category.parentCode IN (:...categoriesId) OR (IsNull(category.parentCode) AND category.mapCatId IN (:...categoriesId))',
          {
            categoriesId,
          },
        )
        .addOrderBy(
          `LOWER(JSON_EXTRACT(category.title, '$.${lang}')) COLLATE ${process.env.DB_COLLATION}`,
          'ASC',
        )
        .getMany();
    } else {
      categories = await this.repository
        .createQueryBuilder('category')
        .leftJoin('category.menus', 'menus')
        .where('menus.id = :menu_id', { menu_id })
        .andWhere('category.parentCode != ""')
        .addOrderBy(
          `LOWER(JSON_EXTRACT(category.title, '$.${lang}')) COLLATE ${process.env.DB_COLLATION}`,
          'ASC',
        )
        .getMany();
    }

    return plainToInstance(CategoryDto, categories);
  }
}
