import { getTokenData } from './../decorators/getTokenData';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { cookieGetter } from '../decorators/cookieGetter.decorator';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@getTokenData('ADMIN') adminData: string, @Body() createPostDto) {
    return this.postService.create(createPostDto, adminData);
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
  update(
    @Param('id') id: string,
    @Body() updatePostDto,
    @getTokenData('ADMIN') adminData: string,
  ) {
    return this.postService.update(+id, updatePostDto, adminData);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @getTokenData('SUPERADMIN') adminData: string,
  ) {
    return this.postService.remove(+id, adminData);
  }
}
