import { getTokenData } from './../decorators/getTokenData';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './admin.model';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(
    @getTokenData('SUPERADMIN') adminData: Partial<Admin>,
    @Body()
    createAdminDto,
  ) {
    return this.adminService.create(createAdminDto, adminData);
  }

  @Post('login')
  login(@Body() authBody) {
    return this.adminService.login(authBody);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Put(':id')
  update(
    @getTokenData('SUPERADMIN') adminData: Partial<Admin>,
    @Param('id') id: string,
    @Body() updateAdminDto,
  ) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(
    @getTokenData('SUPERADMIN') adminData: Partial<Admin>,
    @Param('id') id: string,
  ) {
    return this.adminService.remove(+id);
  }
}
