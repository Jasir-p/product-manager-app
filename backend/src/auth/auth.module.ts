import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[PrismaModule,
    JwtModule.register(
        {
            secret:process.env.JWT_ACCESS_SECRET,
            signOptions:{
                expiresIn:'15m'
            }
        }
    )

  ]
})
export class AuthModule {}
