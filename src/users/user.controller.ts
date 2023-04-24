import {
  Controller,
  Post,
  Body,
  Get
} from '@nestjs/common';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  addUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const createdUser = this.userService.insertUser(
     email,
     password
    );
    return createdUser;
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

}
