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

@Module({
  imports:[
    TypeOrmModule.forFeature([DoctorProfile]),
    TypeOrmModule.forFeature([DoctorSchedule]),
    forwardRef(()=> AuthModule)
  ],
  controllers: [DoctorsController,DoctorScheduleController],
  providers: [DoctorsService,DoctorScheduleService],
  exports:[DoctorsService]
})
export class DoctorsModule {}
