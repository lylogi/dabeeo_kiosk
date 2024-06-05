import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesRepository } from './files.repository';
import { FilesController } from './files.controller';

@Module({
  controllers: [FilesController],
  providers: [FilesService, FilesRepository],
})
export class FilesModule {}
