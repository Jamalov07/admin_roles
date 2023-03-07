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
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(
    @getTokenData('SUPERADMIN') adminData: Partial<Admin>,
    @Body() createRoleDto,
  ) {
    return this.roleService.create(createRoleDto, adminData);
  }

  @Get()
  findAll(@getTokenData('ADMIN') adminData: Partial<Admin>) {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(
    @getTokenData('ADMIN') adminData: Partial<Admin>,
    @Param('id') id: string,
  ) {
    return this.roleService.findOne(+id);
  }

  @Put(':id')
  update(
    @getTokenData('SUPERADMIN') adminData: Partial<Admin>,
    @Param('id') id: string,
    @Body() updateRoleDto,
  ) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(
    @getTokenData('SUPERADMIN') adminData: Partial<Admin>,
    @Param('id') id: string,
  ) {
    return this.roleService.remove(+id);
  }
}
