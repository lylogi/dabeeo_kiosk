import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { FileDto } from './dto/files.dto';
import ErrorMessage from '@config/errors';
import Message from './files.message';
import { Response } from 'express';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get(':seq_code')
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: ErrorMessage[403] })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: Message.NOT_FOUND })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessage[500],
  })
  @ApiOperation({ summary: Message.FIND_DETAIL_ID })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FileDto,
  })
  async findBySeqCode(@Param('seq_code') seqCode: string) {
    return this.filesService.getDetailBySeqCode(seqCode);
  }

  @Get(':name')
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: ErrorMessage[403] })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: Message.NOT_FOUND })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessage[500],
  })
  @ApiOperation({ summary: Message.FIND_DETAIL_ID })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FileDto,
  })
  async findByName(
    @Param('name') name: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.filesService.getDetailByName(name, response);
  }
}
