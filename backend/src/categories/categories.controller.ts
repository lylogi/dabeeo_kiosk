import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import ErrorMessage from '@config/errors';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiQuery({ name: 'lang', required: true, type: String })
  @ApiQuery({ name: 'menu_id', required: false, type: String })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: ErrorMessage[403] })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessage[500],
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [CategoryDto],
  })
  async findAll(@Query() query: any) {
    return this.categoriesService.getAll(query);
  }
}
