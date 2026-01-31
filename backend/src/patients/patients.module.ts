import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientProfile } from './patient-profile.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PatientProfile])],
  controllers: [PatientsController],
  providers: [PatientsService]
})
export class PatientsModule {}
