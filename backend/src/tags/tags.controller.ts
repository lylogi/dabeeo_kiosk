import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { TagService } from './tags.service';
import { TagDto } from './dto/tags.dto';
import ErrorMessage from '@config/errors';
@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagService) {}

  @Get()
  @ApiOperation({ summary: 'Find all tags' })
  @ApiQuery({ name: 'menuId', required: false, type: Number })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR, 
    description: ErrorMessage[500],
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: ErrorMessage[403] })
  @ApiResponse({ status: HttpStatus.OK, type: [TagDto] })
  async findAll(@Query('menuId') menuId) {
    return this.tagsService.getListTags(menuId);
  }
}
