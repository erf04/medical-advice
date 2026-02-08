
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { User } from '../users/users.entity';
import { AuthGuard } from '../auth/auth.guard';
import { UserRole } from '../users/users.entity';
import { GetUser} from './../auth/auth.decorator';

@Controller('doctors')
@UseGuards(AuthGuard, RolesGuard)
export class DoctorsController {
    constructor(private readonly doctorsService: DoctorsService) {}

    @Post('profile')
    @Roles(UserRole.DOCTOR)
    createProfile(
        @GetUser() user: User,
        @Body() dto: CreateDoctorProfileDto,
    ) {
        return this.doctorsService.createProfile(user, dto);
    }

    @Get('profile')
    @Roles(UserRole.DOCTOR)
    getMyProfile(@GetUser() user: User) {
        return this.doctorsService.getMyProfile(user);
    }

    @Get('all')
    getAllDoctors() {
        return this.doctorsService.getAllDoctors();
    }

    @Get(':id')
    getDoctorById(@Param('id') id: number) {
        return this.doctorsService.findProfileById(id);
    }
}
