import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { MenuDto } from './dto/menu.dto';
import { MenuDtoDetail } from './dto/menu-detail.dto';
import ErrorMessage from '@config/errors';
import Message from './menu.message';

@ApiTags('menus')
@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @ApiOperation({ summary: Message.FIND_ALL })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: ErrorMessage[403] })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessage[500],
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [MenuDto],
  })
  findAll() {
    return this.menuService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: Message.FIND_DETAIL_ID })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: ErrorMessage[400],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: Message.NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessage[500],
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: ErrorMessage[403] })
  @ApiResponse({ status: HttpStatus.OK, type: MenuDtoDetail })
  async findOne(@Param('id') id: number) {
    return await this.menuService.getDetail(id);
  }
}
