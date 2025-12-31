import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './auth.dto';
import { AuthGuard } from './auth.guard';
import { User } from './auth.decorator';
import { UserOut } from '../users/user.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')

    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto.phone_number, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')

    getProfile(@User() user : UserOut) : UserOut {
        return user;
    }

    @Post('register/')
    singUp(@Body() signUpDto:SignUpDto){
        return this.authService.singUp(signUpDto);
    }
}
