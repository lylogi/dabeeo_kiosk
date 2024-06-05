import { Module } from '@nestjs/common';
import { PoisService } from './pois.service';
import { PoisController } from './pois.controller';
import { PoisRepository } from './pois.repository';
import { MenuService } from '@src/menu/menu.service';
import { MenuRepository } from '@src/menu/menu.repository';

@Module({
  controllers: [PoisController],
  providers: [PoisService, PoisRepository, MenuService, MenuRepository],
})
export class PoisModule {}
