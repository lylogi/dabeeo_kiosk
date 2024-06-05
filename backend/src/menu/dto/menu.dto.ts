import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class MenuDto {
  @Expose()
  @ApiProperty({ type: Number, description: 'menu id' })
  id = 0;

  @Expose()
  @ApiProperty({ type: Object, description: 'title' })
  title = {};

  @Expose()
  @ApiProperty({ type: String })
  type = '';
}
