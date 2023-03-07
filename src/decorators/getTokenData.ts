import { Admin_Role } from './../admin_roles/admin_roles.model';
import { Role } from './../role/role.model';
import { RoleService } from './../role/role.service';
import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Admin } from '../admin/admin.model';
import { AdminService } from '../admin/admin.service';

export const getTokenData = createParamDecorator(
  async (
    role: string,
    context: ExecutionContext,
  ): Promise<Partial<Admin> | String> => {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const admins = await new AdminService(
      Admin,
      new JwtService(),
      Role,
      Admin_Role,
    ).findAllForSuper();
    // console.log(admins)
    if (!admins.length) {
      return 'first';
    } else {
      if (!authorization) {
        throw new UnauthorizedException('Admin not authorized');
      }
      const refreshToken = authorization.split(' ')[1];
      // console.log(refreshToken);
      if (!refreshToken) {
        throw new UnauthorizedException('admin unauthorized decorator');
      }

      const admin = await new RoleService(Role).findByName(role);

      const adminData: Partial<Admin> = await new JwtService().verify(
        refreshToken,
        {
          secret: process.env.REFRESH_TOKEN_KEY,
        },
      );
      // console.log(adminData);
      if (adminData.roles.length) {
        let AdminRoleIdList = [];
        // console.log(adminData.roles);
        adminData.roles.forEach((adminrole) => {
          AdminRoleIdList.push(adminrole.role_id);
        });
        if (AdminRoleIdList.includes(admin.id)) {
          // console.log('Bu yerda', AdminRoleIdList, admin);
          return adminData;
        } else {
          throw new BadRequestException('Bad request bro!');
        }
      } else {
        throw new BadRequestException('Bad request bro!');
      }
    }
  },
);
