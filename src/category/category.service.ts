import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './category.model';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private categoryRepo: typeof Category) {}

  async create(categoryBody, adminData) {
    const candidate = await this.categoryRepo.findOne({
      where: { name: categoryBody.name },
    });

    if (candidate) {
      throw new BadRequestException('category already exists');
    }
    const newcategory = await this.categoryRepo.create(categoryBody);
    return newcategory;
  }

  async findAll() {
    const categorys = await this.categoryRepo.findAll({
      include: { all: true },
    });
    if (!categorys.length) {
      throw new BadRequestException('categorys not found');
    }
    return categorys;
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      include: { all: true },
    });
    if (!category) {
      throw new BadRequestException('category not found');
    }
    return category;
  }

  async findByName(name: string) {
    const category = await this.categoryRepo.findOne({
      where: { name: name },
      include: { all: true },
    });
    if (!category) {
      throw new BadRequestException('category not found');
    }
    return category;
  }
  async update(id: number, categoryBody) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      include: { all: true },
    });
    if (!category) {
      throw new BadRequestException('category not found');
    }
    category.update(categoryBody);
    return category;
  }

  async remove(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      include: { all: true },
    });
    if (!category) {
      throw new BadRequestException('category not found');
    }
    await this.categoryRepo.destroy({ where: { id } });
    return category;
  }
}
