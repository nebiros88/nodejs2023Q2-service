import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { db } from '../database/database';
import { User } from 'src/types';
import { create } from 'domain';
import { CreateUserDto } from './dto';

@Injectable({})
export class UserService {
  getUsers(): User[] {
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

  createUser(user: CreateUserDto): User | void {
    const { login, password } = user;
    const isLoginNotUniq = db.user.some((user) => user.login === login);

    if (isLoginNotUniq) {
      throw new Error('User with this login already exists!');
    }

    const newUser: User = {
      id: uuidv4(),
      login: login,
      password: password,
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    db.user.push({ ...newUser });

    delete newUser.password;

    return newUser;
  }
}
