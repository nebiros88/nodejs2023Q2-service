import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, FindByOneParam } from './dto';
import { User } from 'src/types';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param() { id }: FindByOneParam) {
    try {
      return this.userService.getUserById(id);
    } catch (error) {
      throw new HttpException(
        'The user with provided id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  createUser(@Body(new ValidationPipe()) { login, password }: CreateUserDto) {
    try {
      return this.userService.createUser({ login, password });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
