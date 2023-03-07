import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin_RoleService } from './admin_roles.service';
import { Admin_RoleController } from './admin_roles.controller';
import { Admin_Role } from './admin_roles.model';

@Module({
  imports: [SequelizeModule.forFeature([Admin_Role])],
  controllers: [Admin_RoleController],
  providers: [Admin_RoleService],
})
export class Admin_RoleModule {}
