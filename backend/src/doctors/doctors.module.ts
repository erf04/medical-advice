import { forwardRef, Module } from '@nestjs/common';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorProfile } from './doctor-profile.entity';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { UsersService } from '../users/users.service';
import { DoctorSchedule } from './doctor-schedule.entity';
import { DoctorScheduleController } from './doctor-schedule.controller';
import { DoctorScheduleService } from './doctor-schedule.service';
import { DoctorDashboardController } from './doctor-dashboard.controller';
import { DoctorDashboardService } from './doctor-dashboard.service';
import { Consultation } from '../consultations/consultation.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([DoctorProfile,Consultation]),
    TypeOrmModule.forFeature([DoctorSchedule]),
    forwardRef(()=> AuthModule)
  ],
  controllers: [DoctorsController,DoctorScheduleController,DoctorDashboardController],
  providers: [DoctorsService,DoctorScheduleService,DoctorDashboardService],
  exports:[DoctorsService]
})
export class DoctorsModule {}
