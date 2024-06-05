import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TagDto {
  @Expose()
  @ApiProperty({ type: Number, description: 'id' })
  id: 0;

  @Expose()
  @ApiProperty({ type: String, description: 'content' })
  content: '';
}
