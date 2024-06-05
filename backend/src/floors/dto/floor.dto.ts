import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class FloorDto {
  @Expose()
  @ApiProperty({ type: String, description: "title floor" })
  title = "";

  @Expose()
  @ApiProperty({ type: Object, description: "List floor's title" })
  subject = {};
}
