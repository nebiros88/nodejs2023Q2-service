import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { db } from '../database/database';
import { User, UserResponse } from 'src/types';
import { CreateUserDto, UpdatePasswordDto } from './dto';
import { REQUEST_ERRORS } from '../constants';

@Injectable({})
export class UserService {
  getUsers(): UserResponse[] {
    const users = db.user.map((user) => {
      const tmpUser = { ...user };
      delete tmpUser.password;
      return tmpUser;
    });
    return users;
  }

  getUserById(id: string): User | void {
    const user = db.user.find((user) => user.id === id);
    if (!user) throw new Error();
    delete user.password;
    return user;
  }

  createUser(user: CreateUserDto): UserResponse | void {
    const { login, password } = user;
    const isLoginNotUniq = db.user.some((user) => user.login === login);

    if (isLoginNotUniq) {
      throw new Error(REQUEST_ERRORS.USER.USER_EXISTS_LOGIN);
    }

    const newUser: User = {
      id: uuidv4(),
      login: login,
      password: password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    db.user.push({ ...newUser });

    delete newUser.password;

    return newUser;
  }

  updatePassword(body: UpdatePasswordDto, id: string): UserResponse | void {
    let user = db.user.find((user) => user.id === id);

    if (!user) {
      throw new Error(REQUEST_ERRORS.USER.NO_USER_WITH_PROVIDED_ID);
    }

    const isWrongPassword = user.password !== body.oldPassword;

    if (isWrongPassword) {
      throw new Error(REQUEST_ERRORS.USER.USER_WRONG_PASSWORD);
    }

    db.user.map((el) => {
      if (el.id === id) {
        el.password = body.newPassword;
        el.version++;
        el.updatedAt = Date.now();

        user = { ...el };
        delete user.password;
      }
    });
    return { ...user };
  }

  deleteUser(id: string): void {
    const user = db.user.find((user) => user.id === id);

    if (!user) {
      throw new Error(REQUEST_ERRORS.USER.NO_USER_WITH_PROVIDED_ID);
    }

    db.user = db.user.filter((user) => user.id !== id);
    return;
  }
}
