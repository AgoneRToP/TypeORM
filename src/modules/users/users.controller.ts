import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos';
import { ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({
    status: 200,
    example: {
      success: true,
      data: {
        id: 1,
        name: 'Alex',
        age: 18,
      },
    },
  })
  async getAll() {
    return await this.usersService.getAll();
  }

  @Post()
  @ApiResponse({
    status: 201,
    example: {
      success: true,
      data: {
        id: 1,
        name: 'Alex',
        age: 18,
      },
    },
  })
  async create(@Body() payload: CreateUserDto) {
    return await this.usersService.create(payload);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    example: {
      success: true,
      data: {
        id: 1,
        name: 'Updated name',
        age: 18,
      },
    },
  })
  async update(
    @Body() payload: Partial<CreateUserDto>,
    @Param('id') id: number,
  ) {
    return await this.usersService.update(id, payload);
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
    return await this.usersService.delete(id);
  }
}
