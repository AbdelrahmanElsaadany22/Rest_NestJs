import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/signup.dto';
import { user } from './schemas/user.schema';
import { signinDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    

    //register controller
    @Post('signup')
    async signup(@Body() signUpDto:signUpDto):Promise<user>
    {
        return this.authService.signUp(signUpDto)
    }

    //login controller
    @Post('signin')
    async signin(@Body() signinDto:signinDto):Promise<{token:string}>
    {
        return this.authService.login(signinDto)
    }
}
