import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNotEmptyObject } from 'class-validator';

@Exclude()
export class PoiDto {
  @Expose()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: 'poi id' })
  id = 0;

  @Expose()
  @IsNotEmptyObject()
  @ApiProperty({ type: Object, description: 'title' })
  title = {};

  @Expose()
  @IsNotEmptyObject()
  @ApiProperty({ type: Object, description: 'description' })
  desc = {};

  @Expose()
  @ApiProperty({ type: Object })
  floor = {};

  @Expose()
  @ApiProperty({ type: Object })
  category = {};

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
  @ApiProperty({ type: Object, description: 'list seqCode' })
  seqCode = {};

  @Expose()
  @ApiProperty({ type: [String], description: 'list tags' })
  tags = [];
}
