import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { db } from '../database/database';
import { User, UserResponse } from 'src/types';
import { CreateUserDto, UpdatePasswordDto } from './dto';
import { REQUEST_ERRORS } from '../constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    // const users = db.user.map((user) => {
    //   const tmpUser = { ...user };
    //   delete tmpUser.password;
    //   return tmpUser;
    // });
    let users = await this.prisma.user.findMany();
    const result = users.map(user => {
      const tempUser = { ...user};
      delete tempUser.password;
      return tempUser;
    })
    return result;
  }

  async getUserById(id: string) {
    // const user = db.user.find((user) => user.id === id);
    // if (!user) throw new Error();
    // delete user.password;
    const user = await this.prisma.user.findUnique({ where: { id }});
    if (!user) throw new Error();
    delete user.password;
    return user;
  }

  async createUser(user: CreateUserDto): Promise<void | UserResponse> {
    const { login, password } = user;
    //const isLoginNotUniq = db.user.some((user) => user.login === login);

    const userByLogin = await this.prisma.user.findMany({ where: {login}});

    if (!userByLogin) {
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
    // db.user.push({ ...newUser });

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
    // let user = db.user.find((user) => user.id === id);
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

    // db.user.map((el) => {
    //   if (el.id === id) {
    //     el.password = body.newPassword;
    //     el.version++;
    //     el.updatedAt = Date.now();

    //     user = { ...el };
    //     delete user.password;
    //   }
    // });

    delete updatedUser.password;

    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    // const user = db.user.find((user) => user.id === id);
    const user = await this.prisma.user.findUnique({ where: { id }});

    if (!user) {
      throw new Error(REQUEST_ERRORS.USER.NO_USER_WITH_PROVIDED_ID);
    }

    // db.user = db.user.filter((user) => user.id !== id);

    await this.prisma.user.delete({ where: {id}});
    return;
  }
}
