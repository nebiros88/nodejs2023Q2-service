import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { User, UserResponse } from 'src/types';
import { CreateUserDto, UpdatePasswordDto } from './dto';
import { REQUEST_ERRORS } from '../constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    let users = await this.prisma.user.findMany();
    const result = users.map(user => {
      const tempUser = { ...user};
      delete tempUser.password;
      return tempUser;
    })
    return result;
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id }});
    if (!user) throw new Error();
    delete user.password;
    return user;
  }

  async createUser(user: CreateUserDto): Promise<void | UserResponse> {
    const { login, password } = user;

    const matchUserByLogin = await this.prisma.user.findFirst({ where: { login }});

    if (matchUserByLogin) {
      throw new Error(REQUEST_ERRORS.USER.USER_EXISTS_LOGIN);
    }

    const currentTime = Date.now();

    const newUser: User = {
      id: uuidv4(),
      login: login,
      password: password,
      version: 1,
      createdAt: currentTime,
      updatedAt: currentTime,
    };

    const data = await this.prisma.user.create({
      data: {
        ...newUser,
        createdAt: new Date(newUser.createdAt),
        updatedAt: new Date(newUser.updatedAt),
      }
    })

    const responseUser = {
      ...data,
      createdAt: data.createdAt.getTime(),
      updatedAt: data.updatedAt.getTime(),
    }

    delete responseUser.password;

    return responseUser;
  }

  async updatePassword(body: UpdatePasswordDto, id: string): Promise<UserResponse | void> {
    let user = await this.prisma.user.findUnique({ where: { id }});

    if (!user) {
      throw new Error(REQUEST_ERRORS.USER.NO_USER_WITH_PROVIDED_ID);
    }

    const isWrongPassword = user.password !== body.oldPassword;

    if (isWrongPassword) {
      throw new Error(REQUEST_ERRORS.USER.USER_WRONG_PASSWORD);
    }

    const currentTime = Date.now();

    const updatedUser = {
      ...user,
      password: body.newPassword,
      createdAt: user.createdAt.getTime(),
      updatedAt: currentTime,
    }
    updatedUser.version++;

    const prismaUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...updatedUser,
        createdAt: new Date(updatedUser.createdAt),
        updatedAt: new Date(updatedUser.updatedAt),
      }
    })
    delete updatedUser.password;

    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id }});

    if (!user) {
      throw new Error(REQUEST_ERRORS.USER.NO_USER_WITH_PROVIDED_ID);
    }

    await this.prisma.user.delete({ where: {id}});
    return;
  }
}
