import { Controller, Post ,Body} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SignupDto } from './dto/signup.dto.js';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService,){}
    @Post('signup')
    signup(@Body()signup_data:SignupDto){
        return this.authService.signup(signup_data)
    }
}
