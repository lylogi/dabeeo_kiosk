import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PoisDto {
  @Expose()
  @ApiProperty({ type: Number, description: 'poi id' })
  id = 0;

  @Expose()
  @ApiProperty({ type: Object, description: 'title' })
  title = {};

  @Expose()
  @ApiProperty({ type: Object, description: 'description' })
  desc = {};

  @Expose()
  @ApiProperty({ type: String })
  coordinateX = '';

  @Expose()
  @ApiProperty({ type: Object })
  coordinateY = {};

  @Expose()
  @ApiProperty({ type: String })
  phone = [];

  @Expose()
  @ApiProperty({ type: String, description: 'seq code' })
  seqCode = '';

  @Expose()
  @ApiProperty({ type: [String], description: 'list tags' })
  tags = [];

  @Expose()
  @ApiProperty({ type: Object })
  floor = {};
}
