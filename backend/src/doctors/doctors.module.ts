import { forwardRef, Module } from '@nestjs/common';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorProfile } from './doctor-profile.entity';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { UsersService } from '../users/users.service';
import { DoctorSchedule } from './schedule/doctor-schedule.entity';
import { DoctorScheduleController } from './schedule/doctor-schedule.controller';
import { DoctorScheduleService } from './schedule/doctor-schedule.service';
import { DoctorDashboardController } from './dashboard/doctor-dashboard.controller';
import { Consultation } from '../consultations/consultation.entity';
import { DoctorAvailabilityController } from './doctor-availablity.controller';
import { DoctorDashboardService } from './dashboard/doctor-dashboard.service';
import { Category } from '../categories/category.entity';
import { Review } from '../reviews/review.entity';
import { AdminMessage } from './admin/admin-message.entity';
import { AdminMessageService } from './admin/admin-message.service';
import { AdminMessageController } from './admin/admin-message.controller';
import { User } from '../users/users.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([DoctorProfile,Consultation,Category,Review,AdminMessage,User]),
    TypeOrmModule.forFeature([DoctorSchedule]),
    forwardRef(()=> AuthModule)
  ],
  controllers: [DoctorsController,DoctorScheduleController,
    DoctorDashboardController,DoctorAvailabilityController, AdminMessageController],
  providers: [DoctorsService,DoctorScheduleService,DoctorDashboardService, AdminMessageService],
  exports:[DoctorsService]
})
export class DoctorsModule {}
