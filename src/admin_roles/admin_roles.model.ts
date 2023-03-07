import {
  HasMany,
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Admin } from '../admin/admin.model';
import { Role } from '../role/role.model';

interface Admin_RoleAttrs {
  admin_id: number;
  role_id: number;
}
@Table({ tableName: 'admin_role' })
export class Admin_Role extends Model<Admin_Role, Admin_RoleAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @ForeignKey(() => Admin)
  @Column({ type: DataType.INTEGER })
  admin_id: string;
  @BelongsTo(() => Admin)
  admin: Admin;
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  role_id: string;
  @BelongsTo(() => Role)
  role: Role;
}
