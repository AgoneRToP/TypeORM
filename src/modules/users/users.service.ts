import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAll() {
    const users = await this.userRepository.find();

    return {
      success: true,
      data: users,
    };
  }

  async create(payload: CreateUserDto) {
    const existing = await this.userRepository.findOneBy({
      name: payload.name,
    });

    if (existing) {
      throw new ConflictException('User already exists');
    }

    const user = this.userRepository.create(payload);

    await this.userRepository.save(user);

    return {
      success: true,
      data: user,
    };
  }
}
