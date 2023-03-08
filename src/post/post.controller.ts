import { getTokenData } from './../decorators/getTokenData';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PostService } from './post.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @getTokenData('ADMIN') adminData: string,
    @Body() createPostDto,
    @UploadedFile() image,
  ) {
    return this.postService.create(createPostDto, adminData, image);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() updatePostDto,
    @getTokenData('ADMIN') adminData: string,
    @UploadedFile() image,
  ) {
    return this.postService.update(+id, updatePostDto, adminData, image);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @getTokenData('SUPERADMIN') adminData: string,
  ) {
    return this.postService.remove(+id, adminData);
  }
}
