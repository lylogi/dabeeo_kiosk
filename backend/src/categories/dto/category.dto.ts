import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CategoryDto {
  @Expose()
  @ApiProperty({ type: String, description: 'id event from server' })
  id = '';

  @Expose()
  @ApiProperty({ type: String })
  mapCatId = '';

  @Expose()
  @ApiProperty({ type: Object })
  title = {};

  @Expose()
  @ApiProperty({ type: String })
  parentCode = '';

  @Expose()
  @ApiProperty({ type: String })
  sortOrder = '';
}
