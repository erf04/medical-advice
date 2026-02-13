import { forwardRef, Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientProfile } from './patient-profile.entity';
import { AuthModule } from '../auth/auth.module';
import { AdminPatientController } from './admin/admin-patient.controller';
import { AdminPatientService } from './admin/admin-patient.service';
import { UsersModule } from '../users/users.module';
import { User } from '../users/users.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([PatientProfile,User]),
    AuthModule,
  ],
  controllers: [PatientsController,AdminPatientController],
  providers: [PatientsService,AdminPatientService],
  exports:[PatientsService]
})
export class PatientsModule {}
