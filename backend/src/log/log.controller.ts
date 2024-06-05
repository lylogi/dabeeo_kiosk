import { Controller, Post, Get, Body, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
import { LogDto } from './dto/log.dto';
import ErrorMessage from '@config/errors';
import Message from './log.message';

@ApiTags('logs')
@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  @ApiOperation({ summary: Message.FIND_ALL })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessage[500],
  })
  @ApiResponse({ status: HttpStatus.OK })
  async findAll() {
    return await this.logService.getListLogs();
  }

  @Post()
  @ApiOperation({ summary: Message.ADD_LOG })
  @ApiResponse({ status: HttpStatus.CREATED, type: LogDto })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: ErrorMessage[403] })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessage[500],
  })
  async create(@Body() createLog: CreateLogDto) {
    return await this.logService.createLogs(createLog);
  }
}
