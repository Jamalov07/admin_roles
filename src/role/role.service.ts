import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './role.model';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleRepo: typeof Role) {}

  async create(roleBody, adminData) {
    const candidate = await this.roleRepo.findOne({
      where: { name: roleBody.name },
    });

    if (candidate) {
      throw new BadRequestException('Role already exists');
    }
    const newRole = await this.roleRepo.create(roleBody);
    return newRole;
  }

  async findAll() {
    const roles = await this.roleRepo.findAll({
      include: { all: true },
    });
    if (!roles.length) {
      throw new BadRequestException('roles not found');
    }
    return roles;
  }

  async findOne(id: number) {
    const role = await this.roleRepo.findOne({
      where: { id },
      include: { all: true },
    });
    if (!role) {
      throw new BadRequestException('role not found');
    }
    return role;
  }

  async findByName(name: string) {
    const role = await this.roleRepo.findOne({
      where: { name: name },
      include: { all: true },
    });
    if (!role) {
      throw new BadRequestException('role not found');
    }
    return role;
  }
  async update(id: number, roleBody) {
    const role = await this.roleRepo.findOne({
      where: { id },
      include: { all: true },
    });
    if (!role) {
      throw new BadRequestException('role not found');
    }
    role.update(roleBody);
    return role;
  }

  async remove(id: number) {
    const role = await this.roleRepo.findOne({
      where: { id },
      include: { all: true },
    });
    if (!role) {
      throw new BadRequestException('role not found');
    }
    await this.roleRepo.destroy({ where: { id } });
    return role;
  }
}
