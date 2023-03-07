import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './admin.model';
import { JwtModule } from '@nestjs/jwt';
import { Role } from '../role/role.model';
import { Admin_Role } from '../admin_roles/admin_roles.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Admin, Role, Admin_Role]),
    JwtModule.register({}),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
