import { Module } from '@nestjs/common';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorProfile } from './doctor-profile.entity';

@Module({
  imports:[TypeOrmModule.forFeature([DoctorProfile])],
  controllers: [DoctorsController],
  providers: [DoctorsService]
})
export class DoctorsModule {}
