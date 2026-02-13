import { Module } from '@nestjs/common';
import { ConsultationsController } from './consultations.controller';
import { ConsultationService } from './consultations.service';
import { Consultation } from './consultation.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { DoctorProfile } from '../doctors/doctor-profile.entity';
import { PatientProfile } from '../patients/patient-profile.entity';
import { DoctorSchedule } from '../doctors/schedule/doctor-schedule.entity';
import { AuthModule } from '../auth/auth.module';
import { DoctorsModule } from '../doctors/doctors.module';
import { PatientsModule } from '../patients/patients.module';
import { WalletModule } from '../wallet/wallet.module';
import { ConsultationMessage } from './chat/consultation-message.entity';
import { ChatGateway } from './chat/chat.gateway';
import { TempFile } from './chat/temp-file.entity';
import { ConsultationChatController } from './chat/consultation-chat.controller';
import { ConsultationChatService } from './chat/consultation-chat.service';
import { SettleRequest } from './settle/settle-req.entity';
import { SettleController } from './settle/settle.controller';
import { SettleService } from './settle/settle.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Consultation,DoctorProfile,
      PatientProfile,DoctorSchedule,ConsultationMessage,TempFile,SettleRequest]),
    AuthModule,
    DoctorsModule,
    PatientsModule,
    WalletModule,

  ],
  controllers: [ConsultationsController,ConsultationChatController,SettleController],
  providers: [ConsultationService,ChatGateway,ConsultationChatService,SettleService],
  exports:[ChatGateway,ConsultationService]
})
export class ConsultationsModule {}
