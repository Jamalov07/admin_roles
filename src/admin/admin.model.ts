import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { Admin_Role } from '../admin_roles/admin_roles.model';
import { Post } from '../post/post.model';

interface AdminAttrs {
  fullname: string;
  username: string;
  password: string;
}
@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, AdminAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({ type: DataType.STRING })
  fullname: string;
  @Column({ type: DataType.STRING })
  username: string;
  @Column({ type: DataType.STRING })
  password: string;

  @HasMany(() => Admin_Role)
  roles: Admin_Role[];

  @HasMany(() => Post)
  posts: Post[];
}
