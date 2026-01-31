import { forwardRef, Module } from '@nestjs/common';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorProfile } from './doctor-profile.entity';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { UsersService } from '../users/users.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([DoctorProfile]),
    forwardRef(()=> AuthModule)
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService],
  exports:[DoctorsService]
})
export class DoctorsModule {}
