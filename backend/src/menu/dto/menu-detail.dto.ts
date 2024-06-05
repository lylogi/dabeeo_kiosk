import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class MenuDtoDetail {
  @Expose()
  @ApiProperty({ type: Number, description: 'menu id' })
  menuId = 0;

  @Expose()
  @ApiProperty({ type: Object, description: 'title' })
  title = {};

  @Expose()
  @ApiProperty({ type: String })
  type = '';

  @Expose()
  @ApiProperty({ type: Array })
  categories: [];
}
