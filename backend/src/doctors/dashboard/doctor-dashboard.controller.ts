import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { User } from '../../users/users.entity';
import { DoctorDashboardService } from './doctor-dashboard.service';
import { AuthGuard } from '../../auth/auth.guard';
import { GetUser } from '../../auth/auth.decorator';

@Controller('doctor/consultations')
@UseGuards(AuthGuard)
export class DoctorDashboardController {
  constructor(
    private readonly doctorDashboardService: DoctorDashboardService,
  ) {}

  @Get('pending')
  getPending(@GetUser() user: User) {
    return this.doctorDashboardService.getPendingConsultations(user.id);
  }

  @Get('active')
  getActive(@GetUser() user: User) {
    return this.doctorDashboardService.getActiveConsultations(user.id);
  }
}
