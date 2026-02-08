import { BadRequestException, forwardRef, Global, HttpException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User, UserRole } from '../users/users.entity';
import { UserOut } from '../users/user.dto';
import { plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './auth.dto';
import { DoctorsService } from '../doctors/doctors.service';
import { PatientsService } from '../patients/patients.service';

@Injectable()
@Global()
export class AuthService {
    constructor(
        private userService:UsersService,
        private jwtService:JwtService,
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
            accessToken : await this.jwtService.signAsync(payload),
            role: user.role,
            hasProfile: this.hasProfile(user),
        }
    }

    async singUp(data:SignUpDto) {
        const exists = await this.userService.findOneByPhone(data.phone.trim());

        if (exists) {
            throw new BadRequestException('Phone already registered');
        }
        const user =  User.fromSignUpDto(data);
        const savedUser = await this.userService.save(user);
        return {
            user: plainToInstance(UserOut, savedUser, {excludeExtraneousValues:true}),
            accessToken: await this.jwtService.signAsync({
                sub: savedUser.id,
                phoneNumber: savedUser.phone
            }),
        };
    }

    private hasProfile(user: User): boolean {
        if (user.role === UserRole.DOCTOR) return !!user.doctorProfile;
        if (user.role === UserRole.PATIENT) return !!user.patientProfile;
        return true;
    }


}
