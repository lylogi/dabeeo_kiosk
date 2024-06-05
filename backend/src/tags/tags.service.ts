import { Injectable } from '@nestjs/common';
import { TagRepository } from './tags.repository';
import { BaseService } from 'src/base/base.service';
import { Tag } from 'entities/tag.entity';
import { plainToInstance } from 'class-transformer';
import { TagDto } from './dto/tags.dto';
@Injectable()
export class TagService extends BaseService<Tag, TagRepository> {
  constructor(repository: TagRepository) {
    super(repository);
  }

  async getListTags(menuId?: number) {
    const tags = await this.repository.find({
      where: { pois: { category: { menus: { id: menuId } } } },
      order: {
        content: 'ASC',
      }
    });
    
    return plainToInstance(TagDto, tags);
  }
}
