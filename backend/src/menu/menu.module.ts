import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuRepository } from './menu.repository';
import { CategoryRepository } from './category.repository';
import { MenuController } from './menu.controller';

@Module({
  controllers: [MenuController],
  providers: [MenuService, MenuRepository, CategoryRepository],
})
export class MenuModule {}
