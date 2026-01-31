import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { User, UserRole } from '../users/users.entity';
import { AuthGuard } from '../auth/auth.guard';
import { GetUser } from '../auth/auth.decorator';
import { CreatePatientProfileDto } from './dto/create-profile-patient.dto';

@Controller('patients')
@UseGuards(AuthGuard, RolesGuard)
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post('profile')
  @Roles(UserRole.PATIENT)
  createProfile(
    @GetUser() user: User,
    @Body() dto: CreatePatientProfileDto,
  ) {
    return this.patientsService.createProfile(user, dto);
  }

  @Get('profile')
  @Roles(UserRole.PATIENT)
  getMyProfile(@GetUser() user: User) {
    return this.patientsService.getMyProfile(user);
  }
}
