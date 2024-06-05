import { PartialType } from '@nestjs/swagger';
import { CreateSyncDatumDto } from './create-sync_datum.dto';

export class UpdateSyncDatumDto extends PartialType(CreateSyncDatumDto) {}
