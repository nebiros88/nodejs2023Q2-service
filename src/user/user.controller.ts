import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto, UserIdDto } from './dto';
import { REQUEST_ERRORS } from '../constants';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param() { id }: UserIdDto) {
    try {
      return this.userService.getUserById(id);
    } catch (error) {
      throw new HttpException(
        REQUEST_ERRORS.NO_USER_WITH_PROVIDED_ID,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  createUser(@Body() { login, password }: CreateUserDto) {
    try {
      return this.userService.createUser({ login, password });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  updatePassword(@Body() body: UpdatePasswordDto, @Param() { id }: UserIdDto) {
    try {
      return this.userService.updatePassword(body, id);
    } catch (error) {
      const statusCode: HttpStatus =
        error.message === REQUEST_ERRORS.NO_USER_WITH_PROVIDED_ID
          ? HttpStatus.NOT_FOUND
          : HttpStatus.FORBIDDEN;

      throw new HttpException(error.message, statusCode);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param() { id }: UserIdDto) {
    try {
      return this.userService.deleteUser(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
