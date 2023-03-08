import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Admin } from '../admin/admin.model';
import { Category } from '../category/category.model';

interface PostAttrs {
  admin_id: number;
  title: string;
  fulltext: string;
  category_id: number;
  image: string;
}
@Table({ tableName: 'post' })
export class Post extends Model<Post, PostAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @ForeignKey(() => Admin)
  @Column({ type: DataType.INTEGER })
  admin_id: number;
  @BelongsTo(() => Admin)
  admin: Admin;

  @Column({ type: DataType.STRING })
  title: string;
  @Column({ type: DataType.STRING })
  fulltext: string;

  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => Category)
  category_id: number;
  @BelongsTo(() => Category)
  category: Category;

  @Column({ type: DataType.STRING })
  image: string;
}
