import { BaseEntity, DeleteResult, Repository } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import { IBaseService } from './i.base.serivce';
import { NotFoundException } from '@nestjs/common';

export class BaseService<T extends BaseEntity, R extends Repository<T>>
  implements IBaseService<T>
{
  protected readonly repository: R;

  constructor(repository: R) {
    this.repository = repository;
  }

  remove(id: EntityId): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  async findOne(id: EntityId): Promise<T> | null {
    // @ts-ignore
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException(
        'Entity ' + id + ' does not exists in the system',
      );
    }

    return entity;
  }

  async update(id: EntityId, data: any): Promise<T> {
    const entity = await this.findOne(id);
    await this.repository.update(id, data);

    return entity;
  }

  countAll(): Promise<number> {
    return this.repository.count();
  }
  findAll(): Promise<T[]> {
    return this.repository.find();
  }

  create(data: any): Promise<T> {
    return this.repository.save(data);
  }
}
