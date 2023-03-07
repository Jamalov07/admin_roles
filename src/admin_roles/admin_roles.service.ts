import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin_Role } from './admin_roles.model';

@Injectable()
export class Admin_RoleService {
  constructor(
    @InjectModel(Admin_Role) private adminroleRepo: typeof Admin_Role,
  ) {}

  async create(adminroleBody) {
    const adminRole = await this.adminroleRepo.findOne({
      where: {
        admin_id: adminroleBody.admin_id,
        role_id: adminroleBody.role_id,
      },
    });
    if (adminRole) {
      throw new BadRequestException('Role allaqachon berilgan');
    }

    const newAdminRole = await this.adminroleRepo.create(adminroleBody);
    return newAdminRole;
  }

  async findAll() {
    const adminRoles = await this.adminroleRepo.findAll({
      include: { all: true },
    });
    if (!adminRoles.length) {
      throw new BadRequestException('Admins Roles not found');
    }
    return adminRoles;
  }

  async findOne(id: number) {
    const adminRole = await this.adminroleRepo.findOne({
      where: { id },
      include: { all: true },
    });
    if (!adminRole) {
      throw new BadRequestException('admin role not found');
    }
    return adminRole;
  }

  async update(id: number, adminroleBody) {
    const adminRole = await this.adminroleRepo.findOne({
      where: { id },
      include: { all: true },
    });
    if (!adminRole) {
      throw new BadRequestException('admin role not found');
    }
    adminRole.update(adminroleBody);
    return adminRole;
  }

  async remove(id: number) {
    const adminRole = await this.adminroleRepo.findOne({
      where: { id },
      include: { all: true },
    });
    if (!adminRole) {
      throw new BadRequestException('admin role not found');
    }
    await this.adminroleRepo.destroy({ where: { id } });
    return adminRole;
  }
}
