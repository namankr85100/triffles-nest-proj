import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from './user.model';

@Injectable()
export class UserService {
  private users: User[] = [];

  insertUser(email: string, password: string) {
    const newUser = new User(email, password, null);
    this.users.push(newUser);
    return newUser;
  }
  getAllUsers() {
    return this.users
  }
}
