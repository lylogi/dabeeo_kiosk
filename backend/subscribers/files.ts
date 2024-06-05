import { EntitySubscriberInterface, EventSubscriber } from 'typeorm';
import { Files } from '@entities/files.entity';
import FileConfig from '@config/files';

@EventSubscriber()
export class FileSubscriber implements EntitySubscriberInterface<Files> {
  listenTo() {
    return Files;
  }

  async afterLoad(file: Files): Promise<void> {
    file.path = FileConfig.imagesPath + file.name;
  }
}
