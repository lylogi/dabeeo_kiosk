import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagService } from './tags.service';
import { TagsController } from './tags.controller';
import { TagRepository } from './tags.repository';
import { Tag } from 'entities/tag.entity';

@Module({
  controllers: [TagsController],
  providers: [TagService, TagRepository],
  imports: [TypeOrmModule.forFeature([Tag])],
})
export class TagsModule {}
