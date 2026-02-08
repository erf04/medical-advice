import { Module } from '@nestjs/common';
import { ConsultationsController } from './consultations.controller';
import { ConsultationService } from './consultations.service';
import { Consultation } from './consultation.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { DoctorProfile } from '../doctors/doctor-profile.entity';
import { PatientProfile } from '../patients/patient-profile.entity';
import { DoctorSchedule } from '../doctors/doctor-schedule.entity';
import { AuthModule } from '../auth/auth.module';
import { DoctorsModule } from '../doctors/doctors.module';
import { PatientsModule } from '../patients/patients.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Consultation,DoctorProfile,PatientProfile,DoctorSchedule]),
    AuthModule,
    DoctorsModule,
    PatientsModule,
    
  ],
  controllers: [ConsultationsController],
  providers: [ConsultationService]
})
export class ConsultationsModule {}
