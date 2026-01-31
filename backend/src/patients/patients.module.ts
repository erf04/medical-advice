import { forwardRef, Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientProfile } from './patient-profile.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([PatientProfile]),
    AuthModule
  ],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports:[PatientsService]
})
export class PatientsModule {}
