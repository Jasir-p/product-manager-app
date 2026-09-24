import { Controller, Post ,Body} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SignupDto} from './dto/signup.dto.js';
import { SigninDto } from './dto/signin.dto.js';
@Controller('/api/auth')
export class AuthController {
    constructor(private readonly authService:AuthService,){}
    @Post('signup')
    signup(@Body()signup_data:SignupDto){
        return this.authService.signup(signup_data)
    }
    @Post('signin')
    signin(@Body()signin_data:SigninDto){
        return this.authService.signin(signin_data)
    }
}
