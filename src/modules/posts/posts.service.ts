import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dtos/create-post.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAll() {
    const posts = await this.postRepository.findAndCount({
      relations: { user: true },
    });

    return {
      success: true,
      count: posts[1],
      data: posts[0],
    };
  }

  async create(payload: CreatePostDto) {
    const user = await this.userRepository.findOne({
      where: { id: payload.authorId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const post = this.postRepository.create({
      title: payload.title,
      description: payload.description,
      user_id: payload.authorId,
    });

    await this.postRepository.save(post);

    return {
      success: true,
      data: post,
    };
  }
}
