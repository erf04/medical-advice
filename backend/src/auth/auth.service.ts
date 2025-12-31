import { Global, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';
import { UserOut } from '../users/user.dto';
import { plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './auth.dto';

@Injectable()
@Global()
export class AuthService {
    constructor(
        private userService:UsersService,
        private jwtService:JwtService
    ){}

    async signIn(phoneNumber:string ,password:string ){
        const user = await this.userService.findOneByPhone(phoneNumber.trim());
        if (!user)
            throw new UnauthorizedException("user not found");
        if (user.password !== password.trim())
            throw new UnauthorizedException("phone number or password is wrong !");
        const payload = {
            sub : user.id,
            phoneNumber:user.phone
        }
        // return plainToInstance(UserOut,User,{excludeExtraneousValues:true});
        return {
            accessToken : await this.jwtService.signAsync(payload)
        }
    }

    async singUp(data:SignUpDto) {
        const user =  User.fromSignUpDto(data);
        return this.userService.save(user);
    }


}
