import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FindByOneParam } from './dto';
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
}
