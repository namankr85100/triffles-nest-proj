import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [  
    JwtModule.register({
        global: true,
        secret: 'secret',
        signOptions: { expiresIn: '60s' },
    }),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
