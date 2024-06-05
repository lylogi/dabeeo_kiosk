import { Pois } from '@entities/pois.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EventsDto {
  @Expose()
  @ApiProperty({ type: String, description: 'id event from server' })
  id = '';

  @Expose()
  @ApiProperty({ type: Object, description: 'title' })
  title = {};

  @Expose()
  @ApiProperty({ type: Array, description: 'image url' })
  files = [];

  @Expose()
  @ApiProperty({ type: Date })
  displayStartDate = '';

  @Expose()
  @ApiProperty({ type: Date })
  displayEndDate = '';

  @Expose()
  @ApiProperty({ type: [Pois] })
  pois = [];

  @Expose()
  @ApiProperty({ type: Object })
  content = {};

  @Expose()
  @ApiProperty({ type: Boolean })
  fullScreen = '';

  @Expose()
  @ApiProperty({ type: Object })
  seqCode = {};
}
