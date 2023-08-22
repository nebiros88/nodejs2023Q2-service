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
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto, UserIdDto } from './dto';
import { REQUEST_ERRORS } from '../constants';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param() { id }: UserIdDto) {
    try {
      return await this.userService.getUserById(id);
    } catch (error) {
      throw new HttpException(
        REQUEST_ERRORS.USER.NO_USER_WITH_PROVIDED_ID,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(@Body() { login, password }: CreateUserDto) {
    try {
      return await this.userService.createUser({ login, password });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updatePassword(
    @Body() body: UpdatePasswordDto,
    @Param() { id }: UserIdDto,
  ) {
    try {
      return await this.userService.updatePassword(body, id);
    } catch (error) {
      const statusCode: HttpStatus =
        error.message === REQUEST_ERRORS.USER.NO_USER_WITH_PROVIDED_ID
          ? HttpStatus.NOT_FOUND
          : HttpStatus.FORBIDDEN;

      throw new HttpException(error.message, statusCode);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param() { id }: UserIdDto) {
    try {
      return await this.userService.deleteUser(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
