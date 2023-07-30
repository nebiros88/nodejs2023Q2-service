import { Injectable } from '@nestjs/common';
import { db } from '../database/database';
import { User } from 'src/types';

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
}
