import { HasMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Admin_Role } from '../admin_roles/admin_roles.model';

interface RoleAttrs {
  name: string;
}
@Table({ tableName: 'role' })
export class Role extends Model<Role, RoleAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({ type: DataType.STRING })
  name: string;

  @HasMany(() => Admin_Role)
  admins_in_this_role: Admin_Role[];
}
