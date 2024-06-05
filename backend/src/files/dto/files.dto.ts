import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class FileDto {
  @Expose()
  @ApiProperty({ type: String, description: 'seq code' })
  seqCode: string;

  @Expose()
  @ApiProperty({ type: String, description: 'file name' })
  name = '';

  @Expose()
  @ApiProperty({ type: String, description: 'file type' })
  type = '';

  @Expose()
  @ApiProperty({ type: String, description: 'file path' })
  filePath = '';
}
