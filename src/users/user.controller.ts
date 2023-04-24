import {
  Controller,
  Post,
  Body,
  Get,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async addUser(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('isAdmin') isAdmin: boolean,
  ) {
    const createdUser = await this.userService.insertUser(
     email,
     password,
     isAdmin
    );
    return createdUser;
  }

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Post('login')
  async signIn(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({passthrough: true}) response: Response
  ) {
    const user = await this.userService.login(email, password);
    if (!user) {
      response.status(404);
      return {
        message: `User not found`,
        statusCode: 404,
      };
    }
    response.status(200)
    // If user is found, create and return a token
    const token = await this.userService.generateToken(email, 'user');
    return {
      message: 'User authenticated',
      token: token,
    };
  }

}
