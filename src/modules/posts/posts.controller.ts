import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly service: PostsService) {}

  @Get()
  async getAll() {
    return await this.service.getAll();
  }

  @Post()
  async create(@Body() payload: CreatePostDto) {
    return await this.service.create(payload)
  }
}
