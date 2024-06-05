import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { FilesRepository } from './files.repository';
import { BaseService } from '@src/base/base.service';
import { Files } from '@entities/files.entity';
import { createReadStream } from 'fs';
import { join } from 'path';
import FileConfig from '@config/files';

@Injectable()
export class FilesService extends BaseService<Files, FilesRepository> {
  constructor(repository: FilesRepository) {
    super(repository);
  }

  async getDetailBySeqCode(seqCode: any) {
    const files = await this.repository.find({
      where: { seqCode },
    });
    if (files.length === 0) {
      throw new NotFoundException(
        'Files with seqcode ' + seqCode + ' are not exists in the system',
      );
    }
    // return this.getStreamFile(file, response);
    return files;
  }

  async getDetailByName(name: any, response: any) {
    const file = await this.repository.findOne({
      where: { name },
    });
    if (!file) {
      throw new NotFoundException(
        'File name ' + name + ' is not exists in the system',
      );
    }
    return this.getStreamFile(file, response);
  }

  getStreamFile(file: any, response: any) {
    const stream = createReadStream(join(process.cwd(), FileConfig.imagesPath));
    response.set({
      'Content-Disposition': `inline; filename="${file.name}"`,
      'Content-Type': file.mimetype,
    });

    return new StreamableFile(stream);
  }
}
