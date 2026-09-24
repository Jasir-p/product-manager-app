import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import bcrypt from 'bcrypt';
import { SigninDto } from './dto/signin.dto.js';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService:  PrismaService,
        private readonly jwtService:JwtService
    ){}
    async signup(signup_data:SignupDto){
        const userExist = await this.prismaService.user.findUnique({
            where:{
                email:signup_data.email
            }
        })

        if(userExist){
            throw new ConflictException('Email alreday registerd')
        }

        const hashedpassword = await bcrypt.hash(signup_data.password,10);
        await this.prismaService.user.create({
            data:{
                email: signup_data.email,
                password:hashedpassword
            }
        })
        return {
      message: 'User registered successfully',
    };

    }

    async signin(signin_data:SigninDto){
        const user =
        await this.prismaService.user.findUnique(
            {
                where:{
                    email:signin_data.email
                }
            }
        )

        if(!user){
            throw new UnauthorizedException(
                'Invalid email or Password'
            );
        }

        const passwordCheck = await bcrypt.compare(
            signin_data.password,
            user.password
        )
        if(!passwordCheck){
            throw new UnauthorizedException(
                'Invalid email or Password'
            );
        }
        const payload = {
            sub:user.id,
            email:user.email
        }
       
         const accessToken =
            await this.jwtService.signAsync(payload, {
                secret: process.env.JWT_ACCESS_SECRET,
                expiresIn: '15m',
            });

        const refreshToken =
            await this.jwtService.signAsync(payload, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '7d',
            });

        
        return {
            access_token:accessToken,
            refresh_token: refreshToken,

        }
    }

    }
