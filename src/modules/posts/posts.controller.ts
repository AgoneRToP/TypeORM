import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('posts')
export class PostsController {
  constructor(private readonly service: PostsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    example: {
      success: true,
      count: 1,
      data: [
        {
          id: 1,
          title: 'Post title',
          description: 'Post description',
          user_id: 1,
          user: {
            id: 1,
            name: 'Alex',
            age: 18,
          },
        },
      ],
    },
  })
  async getAll() {
    return await this.service.getAll();
  }

  @Post()
  @ApiResponse({
    status: 201,
    example: {
      success: true,
      data: {
        id: 1,
        title: 'Post title',
        description: 'Post description',
        user_id: 1,
      },
    },
  })
  async create(@Body() payload: CreatePostDto) {
    return await this.service.create(payload);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    example: {
      success: true,
      data: {
        id: 1,
        title: 'Updated title',
        description: 'Updated description',
        user_id: 1,
      },
    },
  })
  async update(
    @Body() payload: Partial<CreatePostDto>,
    @Param('id') id: number,
  ) {
    return await this.service.update(id, payload);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    example: {
      success: true,
      data: null,
    },
  })
  async delete(@Param('id') id: number) {
    return await this.service.delete(id);
  }
}
