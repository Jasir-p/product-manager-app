import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService:  PrismaService
    ){}
    async signup(signup_data:SignupDto){

        const hashedpassword = await bcrypt.hash(signup_data.password,10);
        return this.prismaService.user.create({
            data:{
                email: signup_data.email,
                password:hashedpassword
            }
        })
    }

    async  signin(signin_data:)
}
