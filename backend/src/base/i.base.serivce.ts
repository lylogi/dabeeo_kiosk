import { DeleteResult } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';

export interface IBaseService<T> {
  findAll(): Promise<T[]>;

  findOne(id: EntityId): Promise<T>;

  create(data: any): Promise<T>;

  update(id: EntityId, data: any): Promise<T>;

  remove(id: EntityId): Promise<DeleteResult>;
}
