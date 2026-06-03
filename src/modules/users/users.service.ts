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

  async update(id: number, payload: Partial<CreateUserDto>) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new ConflictException('User not found');
    }

    Object.assign(user, payload);

    await this.userRepository.save(user);

    return {
      success: true,
      data: user,
    };
  }

  async delete(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new ConflictException('User not found');
    }

    await this.userRepository.delete({ id });

    return {
      success: true,
      data: null,
    };
  }
}
