import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './admin.model';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../role/role.model';
import { Admin_Role } from '../admin_roles/admin_roles.model';
@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminRepo: typeof Admin,
    private readonly jwtService: JwtService,
    @InjectModel(Role) private roleRepo: typeof Role,
    @InjectModel(Admin_Role) private adminroleRepo: typeof Admin_Role,
  ) {}

  async create(adminBody, adminData) {
    const candidate = await this.adminRepo.findOne({
      where: { username: adminBody.username },
    });
    if (candidate) {
      throw new BadRequestException('this username already exists');
    }
    const hashed_password = await bcrypt.hash(adminBody.password, 7);

    const newAdmin = await this.adminRepo.create({
      ...adminBody,
      password: hashed_password,
    });

    if (adminData === 'first') {
      const roles = await this.roleRepo.findAll();
      if (roles.length) {
        roles.forEach(async (role) => {
          await this.adminroleRepo.create({
            admin_id: newAdmin.id,
            role_id: role.id,
          });
        });
      }
      return await this.adminRepo.findOne({
        where: { id: newAdmin.id },
        include: { all: true },
      });
    } else {
      const adminRole = await this.roleRepo.findOne({
        where: { name: 'ADMIN' },
      });
      if (adminRole) {
        await this.adminroleRepo.create({
          admin_id: newAdmin.id,
          role_id: adminRole.id,
        });
      }
      return await this.adminRepo.findOne({
        where: { id: newAdmin.id },
        include: { all: true },
      });
    }
  }

  async findAll() {
    const admins = await this.adminRepo.findAll({ include: { all: true } });
    if (!admins.length) {
      throw new BadRequestException('Admins not found');
    }
    return admins;
  }

  async findAllForSuper() {
    const admins = await this.adminRepo.findAll({ include: { all: true } });
    return admins;
  }

  async findOne(id: number) {
    const admin = await this.adminRepo.findOne({
      where: { id },
      include: { all: true },
    });
    if (!admin) {
      throw new BadRequestException('Admin not found');
    }
    return admin;
  }

  async update(id: number, adminBody) {
    const admin = await this.adminRepo.findOne({
      where: { id },
      include: { all: true },
    });
    if (!admin) {
      throw new BadRequestException('Admin not found');
    }
    if (adminBody.username) {
      const candidate = await this.adminRepo.findOne({
        where: { username: adminBody.username },
      });
    }
    admin.update(adminBody);

    let adminRoleList = [];
    admin.roles.forEach((role) => {
      adminRoleList.push(role.role_id);
    });

    const token = await this.getTokens(admin.id, admin.roles);
    const response = {
      admin: {
        id: admin.id,
        username: admin.username,
        fullname: admin.fullname,
        roles: adminRoleList,
        posts: admin.posts,
        token,
      },
    };

    return response;
}

  async remove(id: number) {
    const admin = await this.adminRepo.findOne({
      where: { id },
      include: { all: true },
    });
    if (!admin) {
      throw new BadRequestException('Admin not found');
    }
    await this.adminRepo.destroy({ where: { id } });
    return admin;
  }

  async login(authBody) {
    const { username, password } = authBody;

    const admin = await this.adminRepo.findOne({
      where: { username: username },
      include: { all: true },
    });
    if (!admin) {
      throw new UnauthorizedException('User not registered1');
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new UnauthorizedException('User not registered2');
    }
    let adminRoleList = [];
    admin.roles.forEach((role) => {
      adminRoleList.push(role.role_id);
    });

    const token = await this.getTokens(admin.id, admin.roles);
    const response = {
      admin: {
        id: admin.id,
        username: admin.username,
        fullname: admin.fullname,
        roles: adminRoleList,
        posts: admin.posts,
        token,
      },
    };

    return response;
  }

  async getTokens(userId: number, adminRoles) {
    const jwtPayload = {
      id: userId,
      roles: adminRoles || [],
    };

    const [refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return refreshToken;
  }
}
