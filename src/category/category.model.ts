import { HasMany, Column, DataType, Model, Table } from 'sequelize-typescript';

interface CategoryAttrs {
  name: string;
}
@Table({ tableName: 'category' })
export class Category extends Model<Category, CategoryAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({ type: DataType.STRING })
  name: string;

}
