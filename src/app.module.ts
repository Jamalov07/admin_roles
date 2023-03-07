import { Admin_RoleModule } from './admin_roles/admin_roles.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './admin/admin.model';
import { AdminModule } from './admin/admin.module';
import { Admin_Role } from './admin_roles/admin_roles.model';
import { Post } from './post/post.model';
import { Role } from './role/role.model';
import { RoleModule } from './role/role.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Admin, Admin_Role, Post, Role],
      autoLoadModels: true,
      logging: false,
    }),
    AdminModule,
    Admin_RoleModule,
    PostModule,
    RoleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
