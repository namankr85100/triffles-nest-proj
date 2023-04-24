import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor(private readonly jwtService: JwtService) {}

  async insertUser(email: string, password: string, isAdmin: boolean) {
    try {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);
      const newUser = new User(email, hash, null, isAdmin);
      this.users.push(newUser);
      return newUser;
    } catch (err) {
      throw new Error(`Error hashing password: ${err.message}`);
    }
  }

  getAllUsers() {
    return this.users.map(user => {
      return {
        email: user.email, 
        profile: user.profile, //Signed Url TODO:
        isAdmin: user.isAdmin
      }
    })
  }

  async login(email: string, password: string) {
    const user = this.users.find(usr => usr.email === email);
    if (!user) return;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
  }

  async generateToken(email: string, role: string) {
    return this.jwtService.signAsync({
        email,
        role 
      });
  }
}
