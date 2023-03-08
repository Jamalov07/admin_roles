import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
  } from '@nestjs/common';
  import { Admin } from '../admin/admin.model';
  import { getTokenData } from '../decorators/getTokenData';
  import { CategoryService } from './category.service';
  
  @Controller('category')
  export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
  
    @Post()
    create(
      @getTokenData('SUPERADMIN') adminData: Partial<Admin>,
      @Body() createcategoryDto,
    ) {
      return this.categoryService.create(createcategoryDto, adminData);
    }
  
    @Get()
    findAll(@getTokenData('ADMIN') adminData: Partial<Admin>) {
      return this.categoryService.findAll();
    }
  
    @Get(':id')
    findOne(
      @getTokenData('ADMIN') adminData: Partial<Admin>,
      @Param('id') id: string,
    ) {
      return this.categoryService.findOne(+id);
    }
  
    @Put(':id')
    update(
      @getTokenData('SUPERADMIN') adminData: Partial<Admin>,
      @Param('id') id: string,
      @Body() updatecategoryDto,
    ) {
      return this.categoryService.update(+id, updatecategoryDto);
    }
  
    @Delete(':id')
    remove(
      @getTokenData('SUPERADMIN') adminData: Partial<Admin>,
      @Param('id') id: string,
    ) {
      return this.categoryService.remove(+id);
    }
  }
  