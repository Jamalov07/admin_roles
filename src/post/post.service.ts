import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';
import { Post } from './post.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post) private postRepo: typeof Post,
    private readonly fileService: FilesService,
  ) {}

  async create(postBody, adminData, image) {
    const fileName = await this.fileService.createFile(image);
    const newpost = await this.postRepo.create({
      ...postBody,
      admin_id: adminData.id,
      image: fileName,
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

  async update(id: number, postBody, adminData, image) {
    const post = await this.postRepo.findOne({
      where: { id },
    });
    if (!post) {
      throw new BadRequestException('post not found');
    }
    if (image) {
      await this.fileService.deleteFile(post.image);
      const fileName = await this.fileService.createFile(image);
      post.update({ ...postBody, image: fileName });
    } else {
      post.update(postBody);
    }
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
    await this.fileService.deleteFile(post.image);
    await this.postRepo.destroy({ where: { id } });
    return post;
  }
}
