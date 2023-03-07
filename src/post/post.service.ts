import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post) private postRepo: typeof Post) {}

  async create(postBody, adminData) {
    const newpost = await this.postRepo.create({
      ...postBody,
      admin_id: adminData.id,
    });
    return newpost;
  }

  async findAll() {
    const posts = await this.postRepo.findAll({
      include: { all: true },
    });
    if (!posts.length) {
      throw new BadRequestException('posts not found');
    }
    return posts;
  }

  async findOne(id: number) {
    const post = await this.postRepo.findOne({
      where: { id },
      include: { all: true },
    });
    if (!post) {
      throw new BadRequestException('post not found');
    }
    return post;
  }

  async update(id: number, postBody, adminData) {
    const post = await this.postRepo.findOne({
      where: { id },
    });
    if (!post) {
      throw new BadRequestException('post not found');
    }
    post.update(postBody);
    return post;
  }

  async remove(id: number, adminData) {
    const post = await this.postRepo.findOne({
      where: { id },
      include: { all: true },
    });
    if (!post) {
      throw new BadRequestException('post not found');
    }
    await this.postRepo.destroy({ where: { id } });
    return post;
  }
}
