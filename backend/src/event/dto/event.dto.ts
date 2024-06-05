import { Pois } from '@entities/pois.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EventDto {
  @Expose()
  @ApiProperty({ type: Object, description: 'title' })
  title = {};

  @Expose()
  @ApiProperty({ type: String, description: 'id event from server' })
  id = '';

  @Expose()
  @ApiProperty({ type: Object })
  content = {};

  @Expose()
  @ApiProperty({ type: Date })
  displayStartDate = '';

  @Expose()
  @ApiProperty({ type: Date })
  displayEndDate = '';

  @Expose()
  @ApiProperty({ type: Boolean })
  fullScreen = '1';

  @Expose()
  @ApiProperty({ type: [Pois] })
  pois = [];

  @Expose()
  @ApiProperty({ type: Array, description: 'image url' })
  files = [];
}
